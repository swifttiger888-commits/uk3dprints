import React from 'react';
import { motion } from 'framer-motion';
import data from '../data/collections.json';

export default function ProductGallery() {
    // Only display the collections that are art categories (not seasonal-favorites or nightgrain-classics)
    const artCategories = data.collections.filter(
        (collection) => collection.id !== 'seasonal-favorites' && collection.id !== 'nightgrain-classics'
    );

    return (
        <section id="boutique" className="py-20 bg-brand-bg relative w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2
                        className="text-4xl font-bold text-brand-text mb-4 uppercase tracking-wider inline-block pb-2"
                        style={{ fontFamily: "'Chalkboard SE', 'Comic Sans MS', cursive, sans-serif" }}
                    >
                        THE UGLY-CUTE BOUTIQUE
                    </h2>
                </div>

                {/* Iterate through each Art Collection (e.g., Cat Buddha, Party Capybara) */}
                {artCategories.map((category) => (
                    <div key={category.id} className="mb-24 last:mb-0">

                        {/* Collection Header */}
                        <div className="flex flex-col items-center justify-center mb-12">
                            <h3
                                className="text-3xl font-extrabold text-brand-text mb-3"
                                style={{ fontFamily: "'Chalkboard SE', 'Comic Sans MS', cursive, sans-serif" }}
                            >
                                The {category.name} Collection
                            </h3>
                            <p className="text-lg text-brand-text opacity-80 max-w-2xl text-center">
                                {category.description}
                            </p>
                        </div>

                        {/* Physical Products Grid (5 items) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {category.items.map((product) => (
                                <motion.div
                                    key={product.id}
                                    whileHover={{ scale: 1.03, rotate: -1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="flex flex-col bg-[#FFF8F0] p-5 relative group overflow-hidden"
                                    style={{
                                        border: '2px solid #333333',
                                        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                                        boxShadow: '4px 6px 0px rgba(51, 51, 51, 0.08)'
                                    }}
                                >
                                    <div className="w-full aspect-square mb-4 flex justify-center items-center bg-white rounded-xl overflow-hidden p-2">
                                        <img
                                            src={product.src}
                                            alt={product.name}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="text-center mt-auto flex flex-col items-center bg-white/50 pt-2 pb-4 -mx-5 px-5">
                                        <h4 className="text-base font-bold text-brand-text mb-1 leading-tight h-10 flex items-center justify-center">
                                            {product.name}
                                        </h4>
                                        <p className="font-extrabold text-[#B07E2F] mb-4 text-xs tracking-wider">
                                            {product.price}
                                        </p>

                                        <a
                                            href={product.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => {
                                                window.dataLayer = window.dataLayer || [];
                                                window.dataLayer.push({
                                                    'event': 'product_click',
                                                    'product_name': product.name,
                                                    'product_id': product.id
                                                });
                                            }}
                                            className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-white bg-brand-accent hover:bg-brand-accentHover transition-colors mt-auto"
                                            style={{
                                                borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                                                border: '1px solid #B07E2F'
                                            }}
                                        >
                                            Get it Now
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}
