import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Shield, Cable, Type, Headphones } from 'lucide-react';
import products from '../data/products.json';

const ICONS = {
  'steering-wheel': Wrench,
  'webcam-cover': Shield,
  'cable-clips': Cable,
  'nameplate': Type,
  'headphone-hook': Headphones,
};

export default function ProductGrid() {
  return (
    <section id="products" className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Products</h2>
          <p className="text-brand-textMuted max-w-xl mx-auto">
            Every item is 3D printed to order in black PLA.
            Free UK shipping on orders over £20.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const Icon = ICONS[product.id];
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden group"
              >
                {/* Image placeholder */}
                <div className="aspect-video bg-black/60 flex items-center justify-center p-4 relative overflow-hidden">
                  <Icon className="w-16 h-16 text-brand-accent/30 group-hover:text-brand-accent/60 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-bg/60">
                    <span className="text-brand-accent text-sm font-semibold">Photo coming soon</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-brand-text">{product.name}</h3>
                      <p className="text-brand-textMuted text-sm">{product.subtitle}</p>
                    </div>
                    {product.featured && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded">
                        Popular
                      </span>
                    )}
                  </div>

                  <p className="text-brand-textMuted text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                      <span key={key} className="text-xs text-brand-textMuted bg-brand-bg border border-brand-border px-2 py-1 rounded">
                        {val}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-brand-accent">
                      £{product.price}
                    </span>
                    {product.customOrder ? (
                      <a
                        href="mailto:hello@uk3dprints.com?subject=Custom Nameplate Order"
                        className="px-4 py-2 text-sm font-semibold rounded border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-black transition-colors"
                      >
                        Order via Email
                      </a>
                    ) : (
                      <button
                        className="px-4 py-2 text-sm font-semibold rounded text-black bg-brand-accent hover:bg-brand-accentHover transition-colors"
                      >
                        Buy Now — £{product.price}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
