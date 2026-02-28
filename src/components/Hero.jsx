import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
            {/* Decorative background blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-brand-accent/20 blur-3xl opacity-60" />
                <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-green-500/10 blur-3xl opacity-60" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center lg:text-left"
                    >
                        <h1 className="text-5xl font-extrabold tracking-tight text-brand-text sm:text-6xl xl:text-7xl">
                            <span className="block mb-2">Curated Art &</span>
                            <span className="block text-brand-accent">Playful Finds</span>
                        </h1>
                        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                            Discover the Ugly-Cute Menagerie. From deadpan cats to wobbly pups, bring home premium naive crayon art stickers and cozy designs today!
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="#boutique"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white bg-brand-accent hover:bg-brand-accentHover transition-all shadow-lg hover:shadow-brand-accent/30 hover:-translate-y-1"
                            >
                                Shop Merch
                            </a>
                            <a
                                href="https://www.redbubble.com/people/nightgrainco/shop"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-brand-text bg-white border border-gray-200 hover:bg-gray-50 hover:border-brand-accent/30 transition-all shadow-sm"
                            >
                                View Redbubble Store
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="mt-16 lg:mt-0 relative flex justify-center"
                    >
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            className="relative w-full max-w-md mx-auto aspect-square drop-shadow-xl"
                        >
                            <img
                                src="/images/sticker4.png"
                                alt="Ugly-Cute Crayon Art Mascot"
                                className="w-full h-full object-contain"
                            />

                            {/* Decorative sparkles */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                className="absolute -top-8 -right-8 w-16 h-16 text-brand-accent opacity-50"
                            >
                                ✨
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
