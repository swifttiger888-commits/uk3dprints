import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">
              <span className="text-brand-text">UK</span><span className="text-brand-accent">3D</span>
              <span className="text-brand-textMuted text-sm ml-1">Prints</span>
            </span>
          </a>
          <div className="hidden md:flex space-x-6">
            <a href="#products" className="text-brand-textMuted hover:text-brand-accent transition-colors text-sm font-medium">Products</a>
            <a href="#about" className="text-brand-textMuted hover:text-brand-accent transition-colors text-sm font-medium">About</a>
            <a href="mailto:hello@uk3dprints.com" className="text-brand-textMuted hover:text-brand-accent transition-colors text-sm font-medium">Contact</a>
          </div>
          <div className="flex items-center">
            <a
              href="#products"
              className="px-4 py-2 text-sm font-semibold rounded text-black bg-brand-accent hover:bg-brand-accentHover transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
