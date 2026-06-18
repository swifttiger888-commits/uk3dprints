/**
 * Pure schema builder functions.
 *
 * These functions have no dependency on import.meta.env or browser APIs.
 * They accept all parameters explicitly, making them usable from both
 * the React app (via seo.js wrapper) and the build-time prerender script.
 */

// ── Organization Schema ────────────────────────────────────────────

/**
 * @param {string} siteUrl - e.g. 'https://uk3dprints.com'
 * @param {string} siteName - e.g. 'UK3D Prints'
 * @param {string} logoUrl - absolute URL to logo image
 */
export function getOrganizationSchema(siteUrl, siteName, logoUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: siteName,
    url: siteUrl,
    logo: logoUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@uk3dprints.com',
      contactType: 'customer service',
      areaServed: 'GB',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
  };
}

// ── Product Schema ─────────────────────────────────────────────────

/**
 * @param {object} product - product object from products.json
 * @param {string} productUrl - full canonical URL of the product page
 * @param {string} imageUrl - absolute URL to the product OG image
 * @param {string} siteName - brand name
 *
 * Note: Offers are intentionally omitted during pre-launch.
 * Once real pricing is confirmed and displayed on-page,
 * add back an `offers` block by attaching getOfferSchema():
 *
 *   schema.offers = getOfferSchema(price, currency, availability);
 *
 * getOfferSchema() includes hasMerchantReturnPolicy, shippingDestination,
 * and deliveryTime matching the site's published policies — do NOT hand-
 * write offers blocks or you'll repeat the drift that caused GSC issues.
 * See getOfferSchema() docs for parameter details.
 */
export function getProductSchema(product, productUrl, imageUrl, siteName) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: product.name,
    description: product.description,
    image: imageUrl,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: siteName,
    },
  };

  // Add material if defined on the product
  if (product.material) {
    schema.material = product.material;
  } else if (product.materials && product.materials.length > 0) {
    schema.material = product.materials.join(', ');
  }

  // Add color if defined on the product
  if (product.color) {
    schema.color = product.color;
  } else if (product.colors && product.colors.length > 0) {
    schema.color = product.colors.join(', ');
  }

  return schema;
}

// ── Offer Schema ──────────────────────────────────────────────────

/**
 * Build the full offers block for a Product schema.
 *
 * Includes hasMerchantReturnPolicy (14-day returns, free),
 * shippingDetails with shippingDestination (GB) and
 * deliveryTime (1-2 day handling + 1 day transit).
 *
 * Once real pricing is confirmed and you're ready to surface
 * offers, attach this to the product schema:
 *
 *   schema.offers = getOfferSchema('14.00', 'GBP', 'https://schema.org/InStock');
 *
 * @param {string} price - e.g. '14.00'
 * @param {string} currency - ISO 4217, e.g. 'GBP'
 * @param {string} availability - e.g. 'https://schema.org/InStock' or 'PreOrder'
 */
export function getOfferSchema(price, currency, availability) {
  return {
    '@type': 'Offer',
    price,
    priceCurrency: currency,
    availability,
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'GB',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 14,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn',
    },
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '1.55',
        currency: 'GBP',
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'GB',
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 1,
          maxValue: 2,
          unitCode: 'DAY',
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 1,
          maxValue: 1,
          unitCode: 'DAY',
        },
      },
    },
  };
}

// ── BreadcrumbList Schema ──────────────────────────────────────────

/**
 * @param {Array<{name: string, url: string}>} items - breadcrumb items (home first, current last)
 */
export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── FAQPage Schema ─────────────────────────────────────────────────

/**
 * @param {Array<{question: string, answer: string}>} faqs
 */
export function getFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
