// TikTok Pixel event tracking utility
// Provides safe wrappers around the ttq object loaded in index.html <head>

const BRAND = 'Unforgotten Pour';
const CURRENCY = 'USD';

// TikTok Pixel test event code — set to verify events in TikTok's Test Event tool.
// Remove or set to null after testing is complete.
const TEST_EVENT_CODE = 'TEST09143';

/**
 * Hash a string with SHA-256 using the Web Crypto API.
 * Returns a hex string, or null if input is empty/unavailable.
 */
async function sha256(value) {
  if (!value) return null;
  try {
    const normalized = String(value).trim().toLowerCase();
    if (!normalized) return null;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(normalized));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return null;
  }
}

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
 * Identify a user with hashed PII (email/phone/external_id).
 * All values are SHA-256 hashed on the client side before sending.
 */
export async function identifyUser({ email, phone, externalId } = {}) {
  const [hashedEmail, hashedPhone, hashedExternalId] = await Promise.all([
    sha256(email),
    sha256(phone),
    sha256(externalId),
  ]);
  const data = {};
  if (hashedEmail) data.email = hashedEmail;
  if (hashedPhone) data.phone_number = hashedPhone;
  if (hashedExternalId) data.external_id = hashedExternalId;
  if (Object.keys(data).length === 0) return;
  safe(() => window.ttq.identify(data));
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