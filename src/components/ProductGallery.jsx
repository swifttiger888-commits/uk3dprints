import React from 'react';
import { motion } from 'framer-motion';

const products = [
    {
        id: 1,
        title: "Pinchy T-Rex",
        img: "/images/sticker4.png",
        link: "https://www.redbubble.com/people/nightgrainco/shop"
    },
    {
        id: 2,
        title: "Lucky Tri-tops",
        img: "/images/sticker2.png",
        link: "https://www.redbubble.com/people/nightgrainco/shop"
    },
    {
        id: 3,
        title: "Clover Neck Bronto",
        img: "/images/sticker3.png",
        link: "https://www.redbubble.com/people/nightgrainco/shop"
    }
];

export default function ProductGallery() {
    return (
        <section className="py-20 bg-brand-bg relative w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2
                        className="text-4xl font-bold text-brand-text mb-4 uppercase tracking-wider inline-block pb-2"
                        style={{ fontFamily: "'Chalkboard SE', 'Comic Sans MS', cursive, sans-serif" }}
                    >
                        St. Paddy's Dino Collection
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ scale: 1.02, rotate: -1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="flex flex-col bg-[#FFF8F0] p-6 relative group overflow-hidden"
                            style={{
                                border: '2px solid #333333',
                                borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                                boxShadow: '4px 6px 0px rgba(51, 51, 51, 0.08)'
                            }}
                        >
                            <div className="w-full aspect-square mb-6 flex justify-center items-center p-4">
                                <img
                                    src={product.img}
                                    alt={product.title}
                                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            <div className="text-center mt-auto flex flex-col items-center">
                                <h3 className="text-xl font-bold text-brand-text mb-6 tracking-tight">
                                    {product.title}
                                </h3>

                                <a
                                    href={product.link}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold uppercase tracking-widest text-white bg-brand-accent hover:bg-brand-accentHover transition-colors mt-auto"
                                    style={{
                                        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                                        border: '1px solid #B07E2F'
                                    }}
                                >
                                    Shop on Redbubble
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
