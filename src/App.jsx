import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import StickerGrid from './components/StickerGrid';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      <Navbar />
      <main>
        <Hero />
        <ProductGallery />
        <StickerGrid />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export default App;
