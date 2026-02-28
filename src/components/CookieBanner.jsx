import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (consent === 'granted') {
            updateGtmConsent('granted');
        } else if (consent === null) {
            // Show the floating banner only if no choice has been made
            setIsVisible(true);
        }
        // If 'denied', it remains naturally hidden and tracking stays strictly off.
    }, []);

    const updateGtmConsent = (status) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
                'ad_storage': status,
                'ad_user_data': status,
                'ad_personalization': status,
                'analytics_storage': status
            });
        }
    };

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'granted');
        updateGtmConsent('granted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'denied');
        // Consent mode was already set to 'denied' in index.html, so we do nothing else
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 max-w-[340px] z-50 bg-[#FFF8F0] p-6 shadow-2xl"
                    style={{
                        border: '2px solid #333333',
                        borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                        boxShadow: '4px 6px 0px rgba(51, 51, 51, 0.08)'
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <h3
                            className="text-xl font-bold text-brand-text leading-tight"
                            style={{ fontFamily: "'Chalkboard SE', 'Comic Sans MS', cursive, sans-serif" }}
                        >
                            🍪 Cookie Time?
                        </h3>
                        <p className="text-sm text-brand-text opacity-90 leading-relaxed font-medium">
                            We use tiny invisible data-crumbs (cookies) to figure out which ugly-cute things you like best. No creepy stuff, promise! Is that okay?
                        </p>

                        <div className="flex gap-3 mt-2">
                            <button
                                onClick={handleAccept}
                                className="flex-1 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white bg-brand-accent hover:bg-brand-accentHover transition-colors"
                                style={{
                                    borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
                                    border: '1px solid #B07E2F'
                                }}
                            >
                                Sure, why not!
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2 text-sm font-bold uppercase text-brand-text border-2 border-brand-text hover:bg-black/5 transition-colors"
                                style={{
                                    borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px',
                                }}
                            >
                                Nope
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
