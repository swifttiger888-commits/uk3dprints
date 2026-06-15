// Cloudflare Images configuration
const CF_IMAGES_ACCOUNT_HASH = import.meta.env.VITE_CF_IMAGES_HASH || '0mC63s07iTD25-GQ6n3_8A';
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://uk3dprints.com';

// Set to true ONLY after enabling Flexible Variants in Cloudflare Images dashboard
// Settings → Hosted Images → Delivery → Flexible variants
const USE_FLEXIBLE_VARIANTS = false;

// Map product IDs to Cloudflare Image UUIDs
const IMAGE_IDS = {
  'steering-wheel': '977f910f-b98d-4ce9-502e-e9327c1a6900',
  'webcam-cover': '81c89a84-6a82-4540-47e6-f5012ad67a00',
  'cable-clips': '9befd410-4e0a-4136-7390-fa136bf2db00',
  'nameplate': '469d46d7-d40e-4d0a-c4dd-6223e01d3d00',
  'headphone-hook': 'c84f4675-deeb-4ef2-5fae-111030052100',
};

// Mode A — named variant (always works, 'public' is guaranteed)
const NAMED_VARIANT = 'public';

// Mode B — flexible transformations (only if enabled in dashboard)
const FLEXIBLE_TRANSFORMS = {
  card: 'w=400,h=300,fit=cover',
  detail: 'w=600,h=600,fit=cover',
  og: 'w=1200,h=630,fit=cover',
};

/**
 * Get the image URL for a product or page.
 *
 * Mode A (default): uses named variant 'public' for all images
 * Mode B: uses flexible transformations when USE_FLEXIBLE_VARIANTS = true
 *
 * Falls back to local SVGs when Cloudflare Images is unavailable.
 *
 * @param {string} productId - e.g. 'steering-wheel'
 * @param {'card'|'detail'|'og'} context - image usage context
 * @param {boolean} absolute - return absolute URL (for OG/schema)
 */
export function getImageUrl(productId, context = 'card', absolute = false) {
  const imageId = IMAGE_IDS[productId];
  const transform = FLEXIBLE_TRANSFORMS[context];

  if (imageId && CF_IMAGES_ACCOUNT_HASH) {
    const suffix = USE_FLEXIBLE_VARIANTS && transform ? transform : NAMED_VARIANT;
    const url = `https://imagedelivery.net/${CF_IMAGES_ACCOUNT_HASH}/${imageId}/${suffix}`;
    return absolute ? url : url;
  }

  // Fallback to local SVG
  const fallback = productId === 'og-preview'
    ? '/images/og-preview.svg'
    : `/images/${productId}-1.svg`;

  return absolute ? `${SITE_URL}${fallback}` : fallback;
}

/**
 * Convenience wrapper that takes a product object.
 */
export function getProductImageUrl(product, context = 'card', absolute = false) {
  return getImageUrl(product.id, context, absolute);
}
