// Cloudflare Images configuration
const CF_IMAGES_ACCOUNT_HASH = import.meta.env.VITE_CF_IMAGES_HASH || '0mC63s07iTD25-GQ6n3_8A';
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://uk3dprints.com';

// Default variant to use (must exist in Cloudflare Images dashboard)
const VARIANT = 'public';

// Map product IDs to Cloudflare Image UUIDs
const IMAGE_IDS = {
  'steering-wheel': '977f910f-b98d-4ce9-502e-e9327c1a6900',
  'webcam-cover': '81c89a84-6a82-4540-47e6-f5012ad67a00',
  'cable-clips': '9befd410-4e0a-4136-7390-fa136bf2db00',
  'nameplate': '469d46d7-d40e-4d0a-c4dd-6223e01d3d00',
  'headphone-hook': 'c84f4675-deeb-4ef2-5fae-111030052100',
};

/**
 * Get the image URL for a product or page.
 * Uses Cloudflare Images CDN with the 'public' variant.
 * Falls back to local SVGs in /public/images/ when needed.
 *
 * @param {string} productId - The product ID (e.g. 'steering-wheel')
 * @param {string} variant - Image variant name (default: 'public')
 * @param {boolean} absolute - Return absolute URL (for OG/schema)
 */
export function getImageUrl(productId, variant = VARIANT, absolute = false) {
  const imageId = IMAGE_IDS[productId];

  if (imageId && CF_IMAGES_ACCOUNT_HASH) {
    const url = `https://imagedelivery.net/${CF_IMAGES_ACCOUNT_HASH}/${imageId}/${variant}`;
    if (absolute && url.startsWith('/')) {
      return `${SITE_URL}${url}`;
    }
    return url;
  }

  // Fallback to local SVG in public/images/
  let fallback;
  if (productId === 'og-preview') {
    fallback = '/images/og-preview.svg';
  } else {
    fallback = `/images/${productId}-1.svg`;
  }

  if (absolute) {
    return `${SITE_URL}${fallback}`;
  }
  return fallback;
}

/**
 * Convenience wrapper that takes a product object.
 */
export function getProductImageUrl(product, variant = VARIANT, absolute = false) {
  return getImageUrl(product.id, variant, absolute);
}
