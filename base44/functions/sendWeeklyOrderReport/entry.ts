import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Auth check: block non-admin direct calls; allow scheduled (no-user) context
    try {
      const user = await base44.auth.me();
      if (user && user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch {
      // No user context — scheduled task, proceed
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

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'AlexandriaWilkinson01@gmail.com',
      subject: `Weekly Order Report — ${orders.length} completed order${orders.length !== 1 ? 's' : ''}`,
      body: body,
    });

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