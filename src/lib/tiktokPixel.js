// TikTok Pixel event tracking utility
// Provides safe wrappers around the ttq object loaded in index.html <head>

const BRAND = 'Unforgotten Pour';
const CURRENCY = 'USD';
const EXT_ID_KEY = 'ttq_external_id';

// PII (email/phone) is held in memory only for the current session — never
// persisted to localStorage. The TikTok pixel hashes these values internally
// at identify time, so there is no need to retain the raw forms across page
// loads or sessions.
let inMemoryPII = {};

function safe(fn) {
  if (typeof window === 'undefined' || !window.ttq) return;
  try {
    fn();
  } catch {
    // swallow — tracking should never break the page
  }
}

/**
 * Normalize a phone number to E.164 format (+[country code][number]).
 * Assumes US (+1) if no country code is present.
 */
function normalizePhoneE164(phone) {
  if (!phone) return '';
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10) return '+1' + digits;
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits;
  return '+' + digits;
}

/**
 * Merge PII into the in-memory (session-only) cache and return the merged set.
 */
function storePII(data) {
  inMemoryPII = { ...inMemoryPII, ...data };
  return inMemoryPII;
}

/**
 * Get or create a persistent external ID for the visitor.
 */
function getOrCreateExternalId() {
  try {
    let id = localStorage.getItem(EXT_ID_KEY);
    if (!id) {
      id = 'fp-' + crypto.randomUUID();
      localStorage.setItem(EXT_ID_KEY, id);
    }
    return id;
  } catch {
    return '';
  }
}

/**
 * Call ttq.identify with available PII.
 * The TikTok pixel hashes plain-text values internally before sending.
 * Only include fields that have real values — passing empty strings causes the
 * pixel to hash the empty string, which TikTok rejects as invalid data.
 */
function callIdentify(email, phone, externalId) {
  const data = {};
  if (email) data.email = email;
  if (phone) data.phone_number = phone;
  if (externalId) data.external_id = externalId;
  if (Object.keys(data).length === 0) return;
  safe(() => window.ttq.identify(data));
}

/**
 * Initialize pixel identification on page load.
 * Calls ttq.identify with any in-memory PII and the external ID so that
 * subsequent events (including the pageview) carry user data.
 */
export function initPixel() {
  const externalId = getOrCreateExternalId();
  callIdentify(inMemoryPII.email, inMemoryPII.phone, externalId);
}

/**
 * Identify a user and persist their PII for future pageviews.
 * Accepts raw (unhashed) email and phone — the pixel hashes internally.
 */
export function identifyUser({ email, phone, externalId } = {}) {
  const pii = storePII({
    ...(email ? { email: email.trim().toLowerCase() } : {}),
    ...(phone ? { phone: normalizePhoneE164(phone) } : {}),
  });
  const extId = externalId || getOrCreateExternalId();
  callIdentify(pii.email, pii.phone, extId);
}

/**
 * Track a ViewContent event when a product or category page is viewed.
 */
export function trackViewContent({ contentId, contentName, contentType = 'product', contentCategory, price, numItems = 1 } = {}) {
  safe(() => window.ttq.track('ViewContent', {
    contents: [{
      content_id: contentId,
      content_type: contentType,
      content_name: contentName,
      content_category: contentCategory,
      price,
      num_items: numItems,
      brand: BRAND,
    }],
    value: price,
    currency: CURRENCY,
  }));
}

/**
 * Track an AddToCart event when a user adds an item to their cart.
 */
export function trackAddToCart({ contentId, contentName, value, contentType = 'product' } = {}) {
  safe(() => window.ttq.track('AddToCart', {
    contents: [{ content_id: contentId, content_type: contentType, content_name: contentName }],
    value,
    currency: CURRENCY,
  }));
}

/**
 * Track an InitiateCheckout event when a user begins the checkout flow.
 */
export function trackInitiateCheckout({ contentId, contentName, value, contentType = 'product' } = {}) {
  safe(() => window.ttq.track('InitiateCheckout', {
    contents: [{ content_id: contentId, content_type: contentType, content_name: contentName }],
    value,
    currency: CURRENCY,
  }));
}

/**
 * Track an AddPaymentInfo event when a user enters payment information.
 */
export function trackAddPaymentInfo({ contentId, contentName, value, contentType = 'product' } = {}) {
  safe(() => window.ttq.track('AddPaymentInfo', {
    contents: [{ content_id: contentId, content_type: contentType, content_name: contentName }],
    value,
    currency: CURRENCY,
  }));
}

/**
 * Track a PlaceAnOrder event when an order is submitted.
 */
export function trackPlaceAnOrder({ contentId, contentName, value, contentType = 'product' } = {}) {
  safe(() => window.ttq.track('PlaceAnOrder', {
    contents: [{ content_id: contentId, content_type: contentType, content_name: contentName }],
    value,
    currency: CURRENCY,
  }));
}

/**
 * Track a Purchase event when a transaction is completed.
 */
export function trackPurchase({ contentId, contentName, value, contentType = 'product' } = {}) {
  safe(() => window.ttq.track('Purchase', {
    contents: [{ content_id: contentId, content_type: contentType, content_name: contentName }],
    value,
    currency: CURRENCY,
  }));
}

/**
 * Track a CompleteRegistration event when a user successfully registers.
 */
export function trackCompleteRegistration({ contentId, contentName, value, contentType = 'product' } = {}) {
  safe(() => window.ttq.track('CompleteRegistration', {
    contents: [{ content_id: contentId, content_type: contentType, content_name: contentName }],
    value,
    currency: CURRENCY,
  }));
}

/**
 * Track a Search event when a user searches for content.
 */
export function trackSearch({ contentId, contentName, searchString, value, contentType = 'product' } = {}) {
  safe(() => window.ttq.track('Search', {
    contents: [{ content_id: contentId, content_type: contentType, content_name: contentName }],
    value,
    currency: CURRENCY,
    search_string: searchString,
  }));
}

/**
 * Track an AddToWishlist event when a user adds an item to a wishlist.
 */
export function trackAddToWishlist({ contentId, contentName, value, contentType = 'product' } = {}) {
  safe(() => window.ttq.track('AddToWishlist', {
    contents: [{ content_id: contentId, content_type: contentType, content_name: contentName }],
    value,
    currency: CURRENCY,
  }));
}