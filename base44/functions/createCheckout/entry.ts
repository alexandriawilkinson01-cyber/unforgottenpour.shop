import Stripe from 'npm:stripe@14';

const PLANS = {
  bloom: { priceId: 'price_bloom', name: 'Bloom Preservation', amount: 29900 },
  memorial: { priceId: 'price_memorial', name: 'Memorial Keepsake', amount: 19900 },
  legacy: { priceId: 'price_legacy', name: 'Legacy Encapsulation', amount: 44900 },
  custom: { priceId: 'price_custom', name: 'Custom Commission', amount: 59900 },
};

Deno.serve(async (req) => {
  try {
    const { planId, priceId, successUrl, cancelUrl } = await req.json();

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        plan: planId,
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});