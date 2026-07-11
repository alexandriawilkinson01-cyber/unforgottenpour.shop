import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

/**
 * Restricted order lookup for the order_status_assistant agent.
 * Only returns an order matching a Stripe session ID, which acts as a
 * secret order reference token that only the customer who completed
 * checkout would possess. Email-based lookups are not supported because
 * there is no way to verify the caller owns the email address.
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { session_id } = await req.json();

    if (typeof session_id !== 'string' || !session_id.trim()) {
      return Response.json({ error: 'A valid order reference number is required' }, { status: 400 });
    }

    // Stripe session IDs start with 'cs_' and are long, unguessable tokens
    // that serve as the customer's proof of ownership for this lookup.
    const trimmed = session_id.trim();
    if (!/^cs_(test_|live_)?[a-zA-Z0-9]{10,}$/.test(trimmed)) {
      return Response.json({ error: 'Invalid order reference format' }, { status: 400 });
    }

    const all = await base44.asServiceRole.entities.Order.filter({
      stripe_session_id: trimmed,
    });
    const orders = all.slice(0, 1);

    // Strip sensitive fields — only return what the customer needs.
    const sanitized = orders.map(o => ({
      product: o.product,
      status: o.status,
      amount: o.amount,
      currency: o.currency,
      created_date: o.created_date,
    }));

    return Response.json({ orders: sanitized });
  } catch (error) {
    console.error('Order lookup error:', error);
    return Response.json({ error: 'Unable to look up order' }, { status: 500 });
  }
});