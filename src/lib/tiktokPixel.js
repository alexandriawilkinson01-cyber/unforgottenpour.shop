// TikTok Pixel event tracking utility
// Provides safe wrappers around the ttq object loaded in index.html <head>

const BRAND = 'Unforgotten Pour';
const CURRENCY = 'USD';
const PII_KEY = 'ttq_user_pii';
const EXT_ID_KEY = 'ttq_external_id';

// TikTok Pixel test event code — set to verify events in TikTok's Test Event tool.
// Remove or set to null after testing is complete.
const TEST_EVENT_CODE = 'TEST09143';

function safe(fn) {
  if (typeof window === 'undefined' || !window.ttq) return;
  try {
    if (TEST_EVENT_CODE && typeof window.ttq.setTestEventCode === 'function') {
      window.ttq.setTestEventCode(TEST_EVENT_CODE);
    }
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
 * Retrieve persisted user PII from localStorage.
 */
function getStoredPII() {
  try {
    return JSON.parse(localStorage.getItem(PII_KEY) || '{}');
  } catch {
    return {};
  }
}

/**
 * Persist user PII to localStorage so it survives page navigations.
 */
function storePII(data) {
  try {
    const merged = { ...getStoredPII(), ...data };
    localStorage.setItem(PII_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return data;
  }
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
 * Call ttq.identify with all available PII.
 * The TikTok pixel hashes values internally before sending.
 * Empty strings are passed for unavailable fields per TikTok EMQ best practices.
 */
function callIdentify(email, phone, externalId) {
  safe(() => window.ttq.identify({
    email: email || '',
    phone_number: phone || '',
    external_id: externalId || '',
  }));
}

/**
 * Initialize pixel identification on page load.
 * Reads persisted PII and external ID from localStorage and calls ttq.identify
 * so that all subsequent events (including the pageview) carry user data.
 */
export function initPixel() {
  const pii = getStoredPII();
  const externalId = getOrCreateExternalId();
  callIdentify(pii.email, pii.phone ? normalizePhoneE164(pii.phone) : '', externalId);
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