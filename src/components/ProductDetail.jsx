import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { products } from '../data/products.json';

export default function ProductDetail({ productId, onBack }) {
  const product = products.find(p => p.id === productId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <section className="pt-32 pb-20 px-4 text-center">
        <p className="text-brand-textMuted">Product not found.</p>
        <button onClick={onBack} className="mt-4 text-brand-accent hover:underline">Back to products</button>
      </section>
    );
  }

  const Icon = ICONS[product.id];

  return (
    <>
      {/* Schema markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": `https://uk3dprints.com/images/${product.images[0]}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock",
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "1.55",
              "currency": "GBP"
            }
          }
        }
      }) }} />

      <section className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-brand-textMuted hover:text-brand-accent transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to products
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square bg-brand-surface border border-brand-border rounded-lg flex items-center justify-center overflow-hidden"
            >
              <img
                src={`/images/${product.images[0]}`}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {product.featured && (
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full mb-3 inline-block">
                  Popular
                </span>
              )}
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-brand-textMuted text-lg mb-2">{product.subtitle}</p>
              <p className="text-brand-accent text-3xl font-bold mb-6">£{product.price}</p>

              <p className="text-brand-textMuted leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Specs table */}
              <div className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden mb-8">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-brand-bg/50' : ''}>
                        <td className="py-3 px-4 text-brand-textMuted font-medium w-1/3">{key}</td>
                        <td className="py-3 px-4 text-brand-text">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CTA */}
              {product.customOrder ? (
                <a
                  href={`mailto:hello@uk3dprints.com?subject=${encodeURIComponent(`Custom ${product.name} Order`)}`}
                  className="block w-full text-center py-4 rounded-lg text-black font-bold bg-brand-accent hover:bg-brand-accentHover transition-colors text-lg"
                >
                  Order via Email — £{product.price}
                </a>
              ) : (
                <button className="block w-full text-center py-4 rounded-lg text-black font-bold bg-brand-accent hover:bg-brand-accentHover transition-colors text-lg">
                  Buy Now — £{product.price}
                </button>
              )}

              {/* Shipping note */}
              <p className="text-brand-textMuted text-xs mt-4 text-center">
                Free UK shipping on orders over £20 · Ships within 2-3 working days · 14-day returns
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
