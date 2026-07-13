import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';
import Stripe from 'npm:stripe@14';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { session_id } = await req.json();
    if (typeof session_id !== 'string' || !session_id.trim()) {
      return Response.json({ error: 'session_id is required' }, { status: 400 });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const session = await stripe.checkout.sessions.retrieve(session_id.trim());

    if (!session || session.payment_status !== 'paid') {
      return Response.json({ error: 'Session not found or not paid' }, { status: 400 });
    }

    // Check if order already exists
    const existing = await base44.asServiceRole.entities.Order.filter({
      stripe_session_id: session.id,
    });

    if (existing.length > 0) {
      return Response.json({ message: 'Order already exists', order: existing[0] });
    }

    const customerName = session.customer_details?.name || session.metadata?.customer_name || 'Unknown';
    const customerEmail = session.customer_details?.email || session.metadata?.customer_email || '';
    const amountTotal = session.amount_total / 100;
    const product = session.metadata?.item || session.metadata?.plan || 'Custom Order';

    const order = await base44.asServiceRole.entities.Order.create({
      customer_name: customerName,
      customer_email: customerEmail,
      amount: amountTotal,
      currency: session.currency || 'USD',
      product,
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent || '',
      status: 'new',
      description: session.metadata?.description || '',
    });

    return Response.json({ message: 'Order imported successfully', order });
  } catch (error) {
    console.error('Import Stripe order error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});