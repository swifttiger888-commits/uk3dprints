// Cloudflare Images configuration
// Get your account hash from: https://dash.cloudflare.com/ > Images
const CF_IMAGES_ACCOUNT_HASH = import.meta.env.VITE_CF_IMAGES_HASH || null;

// Site URL for absolute URLs (used in OG tags, schema markup)
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://uk3dprints.com';

// Map product IDs to Cloudflare Image IDs
const IMAGE_IDS = {
  'steering-wheel': 'steering-wheel',
  'webcam-cover': 'webcam-cover',
  'cable-clips': 'cable-clips',
  'nameplate': 'nameplate',
  'headphone-hook': 'headphone-hook',
  'og-preview': 'og-preview',
};

/**
 * Get the image URL for a product or page.
 * When VITE_CF_IMAGES_HASH is set, uses Cloudflare Images CDN.
 * Otherwise falls back to local SVGs in /public/images/.
 *
 * @param {string} productId - The product ID (e.g. 'steering-wheel')
 * @param {string} variant - Image variant: 'card', 'detail', or 'og'
 * @param {boolean} absolute - Return absolute URL (for OG/schema)
 */
export function getImageUrl(productId, variant = 'card', absolute = false) {
  const imageId = IMAGE_IDS[productId] || productId;

  let url;
  if (CF_IMAGES_ACCOUNT_HASH) {
    url = `https://imagedelivery.net/${CF_IMAGES_ACCOUNT_HASH}/${imageId}/${variant}`;
  } else {
    // Fallback to local SVG
    if (productId === 'og-preview') {
      url = '/images/og-preview.svg';
    } else {
      url = `/images/${imageId}-1.svg`;
    }
  }

  if (absolute && url.startsWith('/')) {
    return `${SITE_URL}${url}`;
  }
  return url;
}

/**
 * Convenience wrapper that takes a product object.
 */
export function getProductImageUrl(product, variant = 'card', absolute = false) {
  return getImageUrl(product.id, variant, absolute);
}
