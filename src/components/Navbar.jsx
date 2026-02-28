import React from 'react';

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <img src="/images/logo.png" alt="Calico & Cream Logo" className="h-12 w-12 object-contain" />
                        <span className="font-extrabold text-2xl text-brand-text tracking-tight">
                            Calico<span className="text-brand-accent"> & Cream</span>
                        </span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#" className="text-gray-600 hover:text-brand-accent transition-colors font-medium">Home</a>
                        <a href="#stickers" className="text-gray-600 hover:text-brand-accent transition-colors font-medium">Shop Stickers</a>
                        <a href="#" className="text-gray-600 hover:text-brand-accent transition-colors font-medium">About</a>
                    </div>
                    <div className="flex items-center">
                        <a
                            href="#stickers"
                            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-full text-white bg-brand-text hover:bg-gray-800 transition-all"
                        >
                            New Arrivals
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
