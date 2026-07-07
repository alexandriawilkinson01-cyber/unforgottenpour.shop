import Stripe from 'npm:stripe@14';

// Server-side mapping: planId → Stripe priceId
// Clients send only planId; the price is resolved here so it can't be tampered with.
const PRICE_MAP = {
  'globe-4': 'price_1TozQ5LfTuG5tMiXzTI8UePr',
  'globe-3': 'price_1TozQ5LfTuG5tMiXmlbFzmr8',
  'globe-2.5': 'price_1TozQ5LfTuG5tMiXomSipXwA',
  'globe-2': 'price_1TozQ5LfTuG5tMiXddnd3rN5',
  'globe-1.7': 'price_1TozQ5LfTuG5tMiXdjYkHcmz',
  'globe-1.3': 'price_1TozQ5LfTuG5tMiX0qlLvwzo',
  'globe-0.9': 'price_1TozQ5LfTuG5tMiXOuFn1bep',
  'square': 'price_1TozQ5LfTuG5tMiXms1wpHDl',
  'hexagon': 'price_1TozQ5LfTuG5tMiXkHVQ2f0K',
  'heart': 'price_1TozQ5LfTuG5tMiX1iza816K',
  'ornaments': 'price_1TozQ5LfTuG5tMiXDOointYz',
  'notebook': 'price_1TozQ5LfTuG5tMiXUfkbrFra',
  'pendant': 'price_1TncnOLfTuG5tMiXlgKFswNl',
  'ring': 'price_1TncnOLfTuG5tMiXLkAZaseC',
  'set': 'price_1TncnOLfTuG5tMiXixbr0SOg',
  'dog-tag-angels': 'price_1TpS1zLfTuG5tMiXz5okDdmR',
};

Deno.serve(async (req) => {
  try {
    const { planId, quantity, successUrl, cancelUrl, metadata } = await req.json();

    const priceId = PRICE_MAP[planId];
    if (!priceId) {
      return Response.json({ error: 'Invalid product' }, { status: 400 });
    }

    const qty = Math.max(1, Math.min(100, parseInt(quantity, 10) || 1));

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: qty }],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        plan: planId,
        ...metadata,
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});