import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';

function App() {
  const [view, setView] = useState('grid');
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        setProductId(hash.replace('#product/', ''));
        setView('detail');
      } else {
        setView('grid');
        setProductId(null);
      }
    }
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToProduct = (id) => {
    window.location.hash = `#product/${id}`;
  };

  const goBack = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-text">
      <Navbar />
      <main>
        {view === 'detail' ? (
          <ProductDetail productId={productId} onBack={goBack} />
        ) : (
          <>
            <Hero />
            <ProductGrid onProductClick={navigateToProduct} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
