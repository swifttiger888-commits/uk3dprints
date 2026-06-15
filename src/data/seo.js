/**
 * SEO constants and schema builders for the React app.
 *
 * Wraps the pure functions in seo-helpers.js with environment defaults
 * from import.meta.env (Vite). The prerender script imports seo-helpers.js
 * directly with explicit parameters.
 */
import { getImageUrl } from '../config.js';
import {
  getOrganizationSchema as _org,
  getProductSchema as _prod,
  getBreadcrumbSchema as _bread,
  getFaqSchema as _faq,
} from './seo-helpers.js';

// ── Site Constants ──────────────────────────────────────────────
export const SITE_NAME = 'UK3D Prints';
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://uk3dprints.com';
export const LOCALE = 'en_GB';
export const DEFAULT_TITLE = 'UK3D Prints | 3D Printed Gaming & Desk Accessories';
export const DEFAULT_DESCRIPTION =
  'UK-made 3D printed gaming accessories, sim racing gear, desk organisation, and custom nameplates. Designed and printed in the UK. No middleman.';

// ── Schema Builders (env-aware wrappers) ───────────────────────────

export function getOrganizationSchema() {
  return _org(SITE_URL, SITE_NAME, `${SITE_URL}/images/og-preview.svg`);
}

/**
 * @param {object} product - product object from products.json
 * @param {string} productUrl - full canonical URL of the product page
 */
export function getProductSchema(product, productUrl) {
  const image = getImageUrl(product.id, 'og', true);
  return _prod(product, productUrl, image, SITE_NAME);
}

/** @param {Array<{name: string, url: string}>} items */
export function getBreadcrumbSchema(items) {
  return _bread(items);
}

/** @param {Array<{question: string, answer: string}>} faqs */
export function getFaqSchema(faqs) {
  return _faq(faqs);
}
