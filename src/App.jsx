import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import { getOrganizationSchema } from './data/seo.js';

function App() {
  const [view, setView] = useState('grid');
  const [productId, setProductId] = useState(null);

  // ── Path-based routing ──────────────────────────────────────────
  useEffect(() => {
    function resolvePath(pathname) {
      if (pathname.startsWith('/product/')) {
        const slug = pathname.replace('/product/', '').replace(/\/+$/, '');
        return { view: 'detail', productId: slug };
      }
      return { view: 'grid', productId: null };
    }

    function handlePopState() {
      const route = resolvePath(window.location.pathname);
      setView(route.view);
      setProductId(route.productId);
    }

    // Initial route
    const initial = resolvePath(window.location.pathname);
    setView(initial.view);
    setProductId(initial.productId);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToProduct = (id) => {
    window.history.pushState({}, '', `/product/${id}`);
    setView('detail');
    setProductId(id);
  };

  const goBack = () => {
    window.history.pushState({}, '', '/');
    setView('grid');
    setProductId(null);
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-brand-bg font-sans text-brand-text">
        {/* Global Organization schema on every page */}
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(getOrganizationSchema())}
          </script>
        </Helmet>

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
    </HelmetProvider>
  );
}

export default App;
