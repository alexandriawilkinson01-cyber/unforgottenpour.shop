import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

/**
 * Restricted order lookup for the order_status_assistant agent.
 * Only returns orders matching the provided email or stripe_session_id,
 * with sensitive fields stripped. This prevents prompt-injection attacks
 * from extracting other customers' order data via the agent.
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, session_id } = await req.json();

    if (!email && !session_id) {
      return Response.json({ error: 'Email or session ID is required' }, { status: 400 });
    }

    let orders = [];

    if (session_id) {
      // Lookup by Stripe session ID — return at most one matching order.
      const all = await base44.asServiceRole.entities.Order.filter({
        stripe_session_id: session_id,
      });
      orders = all.slice(0, 1);
    } else if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      const all = await base44.asServiceRole.entities.Order.filter({
        customer_email: normalizedEmail,
      });
      orders = all.slice(0, 20);
    }

    // Strip sensitive fields — only return what the customer needs to identify their order.
    const sanitized = orders.map(o => ({
      product: o.product,
      status: o.status,
      amount: o.amount,
      currency: o.currency,
      created_date: o.created_date,
      stripe_session_id: o.stripe_session_id,
    }));

    return Response.json({ orders: sanitized });
  } catch (error) {
    console.error('Order lookup error:', error);
    return Response.json({ error: 'Unable to look up order' }, { status: 500 });
  }
});