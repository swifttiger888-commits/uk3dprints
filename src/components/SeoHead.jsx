import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  SITE_URL,
  LOCALE,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  getOrganizationSchema,
  getProductSchema,
  getBreadcrumbSchema,
  getFaqSchema,
} from '../data/seo.js';
import { getImageUrl } from '../config.js';

/**
 * Reusable SEO head component.
 * Injects dynamic <title>, <meta>, <link canonical>, and JSON-LD schemas.
 *
 * Props:
 *   title       — page-specific title (will be appended with " | UK3D Prints")
 *   description — page-specific meta description
 *   ogImage     — productId string or absolute URL for OG image
 *   canonical   — full canonical URL for this page
 *   product     — product object (if on a product detail page)
 *   breadcrumbs — array of {name, url} for BreadcrumbList schema
 *   faqs        — array of {question, answer} for FAQPage schema
 */
export default function SeoHead({
  title,
  description,
  ogImage,
  canonical,
  product,
  breadcrumbs,
  faqs,
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const pageUrl = canonical || SITE_URL;

  // Resolve OG image
  let ogImageUrl = `${SITE_URL}/images/og-preview.svg`;
  if (ogImage) {
    if (ogImage.startsWith('http')) {
      ogImageUrl = ogImage;
    } else {
      // treat as a product ID
      ogImageUrl = getImageUrl(ogImage, 'og', true);
    }
  }

  // Build schemas array — only include what's present
  const schemas = [];

  // Organization schema is always included
  schemas.push(getOrganizationSchema());

  if (product) {
    schemas.push(getProductSchema(product, pageUrl));
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(getBreadcrumbSchema(breadcrumbs));
  }

  if (faqs && faqs.length > 0) {
    schemas.push(getFaqSchema(faqs));
  }

  return (
    <Helmet>
      {/* Title */}
      <title>{pageTitle}</title>

      {/* Meta */}
      <meta name="description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content={LOCALE} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Canonical */}
      <link rel="canonical" href={pageUrl} />

      {/* Structured Data (JSON-LD) */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
