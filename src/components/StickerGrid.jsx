import React from 'react';
import { motion } from 'framer-motion';
import collectionsData from '../data/collections.json';

const collections = collectionsData.collections;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100 }
    }
};

export default function StickerGrid() {
    return (
        <React.Fragment>
            {collections.map((collection, index) => {
                const isClassic = collection.id === 'nightgrain-classics';

                return (
                    <section key={collection.id} id={collection.id} className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-brand-bg'} relative`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-4xl font-bold text-brand-text mb-4"
                                >
                                    {collection.name}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-lg text-gray-600"
                                >
                                    {collection.description}
                                </motion.p>
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${collection.items.length >= 4 ? '4' : '3'} gap-8`}
                            >
                                {collection.items.map((sticker) => (
                                    <motion.div
                                        key={sticker.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -4, scale: 1.01 }}
                                        className="group bg-[#FFF8F0] p-6 transition-all flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
                                        style={{
                                            border: '2px solid #333333',
                                            borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                                            boxShadow: '4px 6px 0px rgba(51, 51, 51, 0.08)'
                                        }}
                                    >
                                        <div className="relative w-48 h-48 mb-6 overflow-hidden drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300">
                                            <img
                                                src={sticker.src}
                                                alt={sticker.name}
                                                className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <h3 className="text-lg font-bold text-brand-text mb-6 line-clamp-1">
                                            {sticker.name}
                                        </h3>

                                        <a
                                            href={sticker.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`mt-auto w-full py-3 px-4 bg-white font-semibold flex items-center justify-center gap-2 transition-colors ${isClassic
                                                ? 'text-[#333333] group-hover:bg-[#333333] group-hover:text-white'
                                                : 'text-brand-accent group-hover:bg-brand-accent group-hover:text-white'
                                                }`}
                                            style={{
                                                borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                                                border: `2px solid ${isClassic ? '#333333' : '#B07E2F'}`
                                            }}
                                        >
                                            View on Redbubble
                                        </a>
                                    </motion.div>
                                ))}
                            </motion.div>

                        </div>
                    </section>
                );
            })}
        </React.Fragment>
    );
}
