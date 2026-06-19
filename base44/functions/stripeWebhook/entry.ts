import Stripe from 'npm:stripe@14';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email || 'Unknown';
      const customerName = session.customer_details?.name || 'Unknown';
      const amountPaid = (session.amount_total / 100).toFixed(2);
      const currency = session.currency?.toUpperCase() || 'USD';
      const plan = session.metadata?.plan || 'N/A';
      const sessionId = session.id;

      const base44 = createClientFromRequest(req);
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: 'AlexandriaWilkinson01@gmail.com',
        subject: `💰 New AmberVault Purchase — $${amountPaid} ${currency}`,
        body: `A new order has been completed on AmberVault!\n\n` +
          `Customer: ${customerName}\n` +
          `Email: ${customerEmail}\n` +
          `Amount: $${amountPaid} ${currency}\n` +
          `Tier / Product: ${plan}\n` +
          `Stripe Session ID: ${sessionId}\n\n` +
          `View in Stripe: https://dashboard.stripe.com/payments/${session.payment_intent}`,
      });

      console.log(`Purchase notification sent for session ${sessionId}`);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});