import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import { getOrganizationSchema, getProductSchema, getBreadcrumbSchema, getFaqSchema } from '../src/data/seo-helpers.js';

const SITE_URL = process.env.VITE_SITE_URL || 'https://uk3dprints.com';
const SITE_NAME = 'UK3D Prints';
const CF_IMAGES_HASH = process.env.VITE_CF_IMAGES_HASH || '0mC63s07iTD25-GQ6n3_8A';
const NAMED_VARIANT = 'public';

// Map product IDs to Cloudflare Image UUIDs (mirrored from config.js)
const IMAGE_IDS = {
  'steering-wheel': '977f910f-b98d-4ce9-502e-e9327c1a6900',
  'webcam-cover': '81c89a84-6a82-4540-47e6-f5012ad67a00',
  'cable-clips': '9befd410-4e0a-4136-7390-fa136bf2db00',
  'nameplate': '469d46d7-d40e-4d0a-c4dd-6223e01d3d00',
  'headphone-hook': 'c84f4675-deeb-4ef2-5fae-111030052100',
};

const { products } = JSON.parse(readFileSync(resolve(__dirname, '../src/data/products.json'), 'utf-8'));
const faqs = JSON.parse(readFileSync(resolve(__dirname, '../src/data/faqs.json'), 'utf-8'));

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function imageUrl(imageId) {
  return `https://imagedelivery.net/${CF_IMAGES_HASH}/${imageId}/${NAMED_VARIANT}`;
}

function ogImageForProduct(product) {
  const imageId = IMAGE_IDS[product.id];
  if (imageId) return imageUrl(imageId);
  return `${SITE_URL}/images/og-preview.svg`;
}

const template = readFileSync(resolve(__dirname, '../dist/index.html'), 'utf-8');

function getProductFaqs(slug) {
  const pp = faqs.perProduct[slug];
  return pp ? pp.slice(0, 2) : [];
}

const DIST = resolve(__dirname, '../dist');

for (const product of products) {
  const slug = product.id;
  const productUrl = `${SITE_URL}/product/${slug}/`;
  const image = ogImageForProduct(product);
  const globalFaqs = faqs.global || [];
  const allFaqs = [...globalFaqs, ...getProductFaqs(slug)];

  const orgSchema = getOrganizationSchema(SITE_URL, SITE_NAME, `${SITE_URL}/images/og-preview.svg`);
  const productSchema = getProductSchema({ ...product, slug }, productUrl, image, SITE_NAME);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/#products` },
    { name: product.name, url: productUrl },
  ]);
  const faqSchema = getFaqSchema(allFaqs);

  let specsHtml = '';
  for (const [label, value] of Object.entries({ Material: product.material, Colour: product.color })) {
    if (value) specsHtml += `<tr><td style="font-weight:600;padding:4px 12px 4px 0">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>\n  `;
  }

  let faqsHtml = '';
  for (const faq of allFaqs) {
    faqsHtml += `<details style="margin-bottom:8px;border:1px solid #333;border-radius:8px;padding:12px"><summary style="font-weight:600;cursor:pointer">${escapeHtml(faq.question)}</summary><p style="margin-top:8px;color:#aaa">${escapeHtml(faq.answer)}</p></details>\n`;
  }

  const bodyContent = `
<div style="max-width:900px;margin:0 auto;padding:24px;font-family:system-ui,-apple-system,sans-serif">
  <nav aria-label="Breadcrumb" style="font-size:14px;color:#888;margin-bottom:24px">
    <a href="${SITE_URL}" style="color:#06b6d4">Home</a>
    <span aria-hidden="true"> &rsaquo; </span>
    <a href="${SITE_URL}/#products" style="color:#06b6d4">Products</a>
    <span aria-hidden="true"> &rsaquo; </span>
    <span aria-current="page">${escapeHtml(product.name)}</span>
  </nav>
  <img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)}" style="max-width:100%;border-radius:12px;margin-bottom:24px" />
  <h1 style="font-size:2rem;font-weight:700;margin-bottom:8px">${escapeHtml(product.name)}</h1>
  <p style="font-size:1.1rem;color:#aaa;margin-bottom:24px">${escapeHtml(product.subtitle || '')}</p>
  <p style="margin-bottom:24px">${escapeHtml(product.description || '')}</p>
  <h2 style="font-size:1.3rem;font-weight:600;margin-bottom:12px">Specifications</h2>
  <table style="margin-bottom:24px;font-size:0.95rem">${specsHtml}</table>
  <div style="background:#1a1a2e;border:1px solid #333;border-radius:8px;padding:16px;margin-bottom:24px">
    <p style="font-size:0.9rem;color:#aaa;margin:0"><strong style="color:#e0e0e0">Pre-launch item.</strong> This is part of the initial UK3D Prints launch batch. Final pricing and availability will be confirmed after printer testing. Request early access via uk3dprints.com to be notified when this product is ready to order.</p>
  </div>
  <h2 style="font-size:1.3rem;font-weight:600;margin-bottom:12px">Frequently Asked Questions</h2>
  ${faqsHtml || '<p style="color:#666">No FAQs available for this product.</p>'}
</div>`;

  let html = template;
  const title = `${product.name} — ${product.subtitle ? product.subtitle + ' | ' : ''}UK3D Prints`;
  const description = product.description || `Discover ${product.name} — 3D printed in the UK. ${product.subtitle || ''}`;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta name="description"[^>]*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<link rel="canonical"[^>]*\/?>/, `<link rel="canonical" href="${escapeHtml(productUrl)}" />`);
  html = html.replace(/<meta property="og:url"[^>]*\/?>/, `<meta property="og:url" content="${escapeHtml(productUrl)}" />`);
  html = html.replace(/<meta property="og:title"[^>]*\/?>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta property="og:description"[^>]*\/?>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:image"[^>]*\/?>/, `<meta property="og:image" content="${escapeHtml(image)}" />`);
  html = html.replace(/<meta name="twitter:title"[^>]*\/?>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*\/?>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta name="twitter:image"[^>]*\/?>/, `<meta name="twitter:image" content="${escapeHtml(image)}" />`);

  const schemas = [orgSchema, productSchema, breadcrumbSchema, faqSchema]
    .map(s => `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`).join('\n  ');
  html = html.replace('</head>', `  ${schemas}\n</head>`);
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${bodyContent}</div>`);

  const outDir = resolve(DIST, 'product', slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'index.html'), html, 'utf-8');
  console.log(`✅  ${productUrl}`);
}

console.log(`\n📦  Prerendered ${products.length} product pages`);
