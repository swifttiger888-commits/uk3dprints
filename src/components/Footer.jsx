import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-brand-text text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                <img src="/images/logo.png" alt="Calico & Cream Logo" className="h-20 w-20 mb-4 object-contain" />
                <div className="text-2xl font-extrabold tracking-tight mb-2">
                    Calico<span className="text-brand-accent"> & Cream</span>
                </div>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                    Spreading prehistoric luck one sticker at a time. Designed for Redbubble with 💚.
                </p>
                <div className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Calico & Cream. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
