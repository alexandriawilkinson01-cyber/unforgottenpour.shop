import Stripe from 'npm:stripe@14';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Server-side mappings: planId → Stripe priceId and product name.
// Clients send only planId; price and product name are resolved here so they
// can't be tampered with via client-supplied metadata.
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
  'keychain': 'price_1TsKcKLfTuG5tMiXu7rwhKZ8',
};

// Server-side product name map — overrides any client-supplied item name in
// metadata so the charged price and recorded product always match.
const PRODUCT_NAME_MAP = {
  'globe-4': '4" Resin Globe',
  'globe-3': '3" Resin Globe',
  'globe-2.5': '2.5" Resin Globe',
  'globe-2': '2" Resin Globe',
  'globe-1.7': '1.7" Resin Globe',
  'globe-1.3': '1.3" Resin Globe',
  'globe-0.9': '0.9" Resin Globe',
  'square': 'Square Block',
  'hexagon': 'Hexagon Block',
  'heart': 'Heart Shaped Resin',
  'ornaments': 'Small Circle Ornaments (Set of 4)',
  'notebook': 'Resin Notebook',
  'pendant': 'Memorial Pendant',
  'ring': 'Memorial Ring',
  'set': 'Memorial Jewelry Set',
  'dog-tag-angels': '"Man\'s Best Friend" Memorial Dog Tag',
  'keychain': 'Small Resin Keychain',
};

/**
 * Whitelist and sanitize client-supplied metadata fields for the Stripe session.
 * Only these fields are passed through; everything else is dropped.
 */
function buildSafeMetadata(metadata) {
  if (!metadata || typeof metadata !== 'object') return {};
  const allowed = ['description', 'customer_name', 'phone', 'category', 'format', 'instructions'];
  const result = {};
  for (const key of allowed) {
    if (typeof metadata[key] === 'string' && metadata[key].trim()) {
      result[key] = metadata[key].slice(0, 500);
    }
  }
  return result;
}

/**
 * Validate that a client-supplied URL points back to the app's own origin.
 * Prevents open redirect attacks via attacker-controlled success/cancel URLs.
 */
function validateReturnUrl(url, fallbackPath, req) {
  // Derive the trusted origin from the runtime request URL — NOT from the
  // raw 'Host' header, which an attacker can manipulate.
  const trustedOrigin = new URL(req.url).origin;

  try {
    // Extract ONLY the pathname + search params from the user-supplied URL.
    // The origin from user input is never used — prevents open redirect
    // via attacker-controlled success/cancel URLs.
    const parsed = new URL(url, trustedOrigin);
    return trustedOrigin + parsed.pathname + parsed.search;
  } catch {
    // invalid URL — fall through to fallback
  }
  return trustedOrigin + fallbackPath;
}

Deno.serve(async (req) => {
  try {
    const { planId, quantity, successUrl, cancelUrl, metadata } = await req.json();

    const priceId = PRICE_MAP[planId];
    if (!priceId) {
      return Response.json({ error: 'Invalid product' }, { status: 400 });
    }

    const qty = Math.max(1, Math.min(100, parseInt(quantity, 10) || 1));

    const safeSuccessUrl = validateReturnUrl(successUrl, '/success', req);
    const safeCancelUrl = validateReturnUrl(cancelUrl, '/order', req);

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: qty }],
      mode: 'payment',
      success_url: safeSuccessUrl,
      cancel_url: safeCancelUrl,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        plan: planId,
        item: PRODUCT_NAME_MAP[planId] || planId,
        ...buildSafeMetadata(metadata),
      },
    });

    // Track that a checkout was initiated (marketing KPI). Wrapped so an
    // analytics failure can never break the checkout redirect.
    try {
      const base44 = createClientFromRequest(req);
      await base44.analytics.track({ eventName: 'checkout_initiated' });
    } catch (analyticsError) {
      console.error('Analytics track error:', analyticsError);
    }

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});