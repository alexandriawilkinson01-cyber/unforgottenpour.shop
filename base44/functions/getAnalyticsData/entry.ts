import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('google_analytics');
    const authHeader = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };

    // Discover the first GA4 property
    const summariesRes = await fetch('https://analyticsadmin.googleapis.com/v1beta/accountSummaries', { headers: authHeader });
    if (!summariesRes.ok) {
      const errText = await summariesRes.text();
      console.error('GA Admin API error:', errText);
      return Response.json({ error: 'Failed to list GA properties', details: errText }, { status: 502 });
    }
    const summaries = await summariesRes.json();
    const property = summaries.accountSummaries
      ?.flatMap(a => a.propertySummaries || [])
      ?.[0];

    if (!property) {
      return Response.json({ error: 'No GA4 properties found in this account' }, { status: 404 });
    }

    const propertyId = property.property.replace('properties/', '');

    // Parse query params for date range, default last 30 days
    const urlParams = new URLSearchParams(req.url.split('?')[1] || '');
    const days = parseInt(urlParams.get('days') || '30', 10);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const fmt = (d) => d.toISOString().split('T')[0];

    // Run report: daily visitors by page path
    const reportRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST',
      headers: authHeader,
      body: JSON.stringify({
        dateRanges: [{ startDate: fmt(startDate), endDate: fmt(endDate) }],
        dimensions: [
          { name: 'date' },
          { name: 'hostName' },
          { name: 'pagePath' },
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'newUsers' },
        ],
        orderBys: [
          { dimension: { dimensionName: 'date' }, desc: true },
          { metric: { metricName: 'sessions' }, desc: true },
        ],
        limit: 10000,
      }),
    });

    if (!reportRes.ok) {
      const errText = await reportRes.text();
      console.error('GA Data API error:', errText);
      return Response.json({ error: 'Failed to fetch analytics report', details: errText }, { status: 502 });
    }

    const report = await reportRes.json();

    // Aggregate daily totals
    const dailyTotals = {};
    const pageTotals = {};

    (report.rows || []).forEach(row => {
      const [date, host, path] = row.dimensionValues.map(d => d.value);
      const [sessions, activeUsers, pageViews, newUsers] = row.metricValues.map(m => parseInt(m.value, 10));

      if (!dailyTotals[date]) {
        dailyTotals[date] = { date, sessions: 0, activeUsers: 0, pageViews: 0, newUsers: 0 };
      }
      dailyTotals[date].sessions += sessions;
      dailyTotals[date].activeUsers += activeUsers;
      dailyTotals[date].pageViews += pageViews;
      dailyTotals[date].newUsers += newUsers;

      const pageKey = `${host}${path}`;
      if (!pageTotals[pageKey]) {
        pageTotals[pageKey] = { path: pageKey, sessions: 0, activeUsers: 0, pageViews: 0 };
      }
      pageTotals[pageKey].sessions += sessions;
      pageTotals[pageKey].activeUsers += activeUsers;
      pageTotals[pageKey].pageViews += pageViews;
    });

    const daily = Object.values(dailyTotals).sort((a, b) => a.date.localeCompare(b.date));
    const pages = Object.values(pageTotals).sort((a, b) => b.pageViews - a.pageViews);

    return Response.json({
      property: { id: propertyId, displayName: property.displayName },
      dateRange: { startDate: fmt(startDate), endDate: fmt(endDate), days },
      totals: {
        sessions: daily.reduce((s, d) => s + d.sessions, 0),
        activeUsers: daily.reduce((s, d) => s + d.activeUsers, 0),
        pageViews: daily.reduce((s, d) => s + d.pageViews, 0),
        newUsers: daily.reduce((s, d) => s + d.newUsers, 0),
      },
      daily,
      pages,
    });
  } catch (error) {
    console.error('Analytics function error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});