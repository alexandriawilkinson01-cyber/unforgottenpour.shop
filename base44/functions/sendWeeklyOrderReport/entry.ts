import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Build an RFC 2822 message with proper base64url encoding for Gmail API
// Uses TextEncoder so UTF-8 characters (em-dashes, etc.) don't break btoa()
function buildGmailMessage(to, subject, body) {
  const lines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset=UTF-8`,
    `MIME-Version: 1.0`,
    ``,
    body,
  ];
  const raw = lines.join('\r\n');
  const bytes = new TextEncoder().encode(raw);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Auth check: require admin authentication — no anonymous access
    let user;
    try {
      user = await base44.auth.me();
    } catch {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Date range: last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Fetch delivered orders updated in the last 7 days (service role bypasses RLS)
    const orders = await base44.asServiceRole.entities.Order.filter({
      status: 'delivered',
      updated_date: { $gte: sevenDaysAgo.toISOString() }
    });

    const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const reportDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    let body = `Weekly Order Report — ${reportDate}\n\n`;
    body += `Completed (delivered) orders this week: ${orders.length}\n`;
    body += `Total revenue: $${totalRevenue.toFixed(2)}\n\n`;

    if (orders.length === 0) {
      body += 'No orders were completed this week.\n';
    } else {
      body += `${'='.repeat(50)}\n\n`;
      orders.forEach((o, i) => {
        body += `Order ${i + 1}:\n`;
        body += `  Customer: ${o.customer_name}\n`;
        body += `  Email: ${o.customer_email}\n`;
        body += `  Product: ${o.product}\n`;
        body += `  Amount: $${(o.amount || 0).toFixed(2)}\n`;
        body += `  Delivered: ${o.updated_date ? new Date(o.updated_date).toLocaleDateString() : 'N/A'}\n`;
        if (o.description) body += `  Notes: ${o.description}\n`;
        body += `\n`;
      });
    }

    body += `\n— Unforgotten Pour Studio`;

    const subject = `Weekly Order Report — ${orders.length} completed order${orders.length !== 1 ? 's' : ''}`;
    const raw = buildGmailMessage('AlexandriaWilkinson01@gmail.com', subject, body);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('gmail');

    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gmail API error:', errText);
      return Response.json({ error: `Gmail API error: ${errText}` }, { status: 500 });
    }

    return Response.json({
      success: true,
      orderCount: orders.length,
      totalRevenue: totalRevenue.toFixed(2)
    });
  } catch (error) {
    console.error('Weekly report error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});