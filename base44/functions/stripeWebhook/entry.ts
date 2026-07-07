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
      const plan = session.metadata?.item || session.metadata?.plan || 'N/A';
      const sessionId = session.id;

      const base44 = createClientFromRequest(req);

      // Studio notification
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: 'AlexandriaWilkinson01@gmail.com',
        subject: `💰 New Unforgotten Pour Purchase — $${amountPaid} ${currency}`,
        body: `A new order has been completed on Unforgotten Pour!\n\n` +
          `Customer: ${customerName}\n` +
          `Email: ${customerEmail}\n` +
          `Amount: $${amountPaid} ${currency}\n` +
          `Tier / Product: ${plan}\n` +
          `Stripe Session ID: ${sessionId}\n\n` +
          `View in Stripe: https://dashboard.stripe.com/payments/${session.payment_intent}`,
      });

      // Customer confirmation email
      if (customerEmail && customerEmail !== 'Unknown') {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: customerEmail,
          subject: `Thank you for your order — Unforgotten Pour`,
          body: `Hi ${customerName},\n\n` +
            `Thank you for your order with Unforgotten Pour. We're honored you've trusted us to preserve what matters most.\n\n` +
            `Order Summary:\n` +
            `Product: ${plan}\n` +
            `Amount: $${amountPaid} ${currency}\n` +
            `Order Reference: ${sessionId}\n\n` +
            `What happens next?\n` +
            `• Within 24 hours, we'll reach out personally with intake instructions and your prepaid shipping label.\n` +
            `• Once we receive your items, we'll send confirmation photos and a progress timeline.\n` +
            `• Your handcrafted piece will be cast, polished, and shipped back to you within the estimated turnaround.\n\n` +
            `If you have any questions, simply reply to this email or contact us at AlexandriaWilkinson01@gmail.com.\n\n` +
            `With gratitude,\n` +
            `The Unforgotten Pour Studio Team`,
        });
      }

      // Save order to database
      try {
        await base44.asServiceRole.entities.Order.create({
          customer_name: customerName,
          customer_email: customerEmail,
          amount: parseFloat(amountPaid),
          currency,
          product: plan,
          stripe_session_id: sessionId,
          stripe_payment_intent_id: session.payment_intent || '',
          status: 'new',
        });
        console.log(`Order saved to database for session ${sessionId}`);
      } catch (dbErr) {
        console.error('Failed to save order to database:', dbErr.message);
      }

      console.log(`Purchase notifications sent for session ${sessionId}`);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});