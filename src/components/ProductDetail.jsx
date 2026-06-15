import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { products } from '../data/products.json';
import { getProductImageUrl } from '../config.js';
import SeoHead from './SeoHead';
import { SITE_URL } from '../data/seo.js';
import faqsData from '../data/faqs.json';

export default function ProductDetail({ productId, onBack }) {
  const product = products.find(p => p.id === productId);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset form state when navigating between products
    setShowForm(false);
    setFormSubmitted(false);
    setFormData({ name: '', email: '', message: '' });
  }, [productId]);

  if (!product) {
    return (
      <section className="pt-32 pb-20 px-4 text-center">
        <p className="text-brand-textMuted">Product not found.</p>
        <button onClick={onBack} className="mt-4 text-brand-accent hover:underline">Back to products</button>
      </section>
    );
  }

  // ── Breadcrumbs ─────────────────────────────────────────────────
  const productUrl = `${SITE_URL}/product/${product.id}/`;
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: product.name, url: productUrl },
  ];

  // ── FAQs ────────────────────────────────────────────────────────
  const productFaqs = faqsData.perProduct[product.id] || [];
  const allFaqs = [...faqsData.global, ...productFaqs];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // ── Interest form handlers ──────────────────────────────────────
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('[Early Access Interest]', {
      product: product.name,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date().toISOString(),
    });
    setFormSubmitted(true);
  };

  return (
    <>
      {/* SEO head — dynamic title, description, OG, canonical, schemas */}
      <SeoHead
        title={`${product.name} — ${product.subtitle}`}
        description={product.description}
        ogImage={product.id}
        canonical={productUrl}
        product={product}
        breadcrumbs={breadcrumbs}
        faqs={allFaqs}
      />

      <section className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-brand-textMuted">
              <li>
                <a href="/" className="hover:text-brand-accent transition-colors">Home</a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-text" aria-current="page">{product.name}</li>
            </ol>
          </nav>

          <button
            onClick={onBack}
            className="flex items-center gap-2 text-brand-textMuted hover:text-brand-accent transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to products
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square bg-brand-surface border border-brand-border rounded-lg flex items-center justify-center overflow-hidden"
            >
              <img
                src={getProductImageUrl(product, "detail")}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {product.featured && (
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full mb-3 inline-block">
                  Popular
                </span>
              )}
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-brand-textMuted text-lg mb-2">{product.subtitle}</p>

              {/* Early access badge */}
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full mb-6 inline-block">
                Early Access
              </span>

              {/* Colour / Material badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.color && (
                  <span className="text-xs font-medium text-brand-text bg-brand-surface border border-brand-border px-3 py-1.5 rounded-full">
                    Colour: {product.color}
                  </span>
                )}
                {product.material && (
                  <span className="text-xs font-medium text-brand-text bg-brand-surface border border-brand-border px-3 py-1.5 rounded-full">
                    Material: {product.material}
                  </span>
                )}
              </div>

              <p className="text-brand-textMuted leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Pre-launch disclaimer */}
              <div className="bg-brand-surface border border-brand-border rounded-lg p-4 mb-8">
                <p className="text-sm text-brand-textMuted leading-relaxed">
                  <strong className="text-brand-text">Pre-launch item.</strong>{' '}
                  This is part of the initial UK3D Prints launch batch. Final pricing and
                  availability will be confirmed after printer testing. Request early access
                  to be notified when this product is ready to order.
                </p>
              </div>

              {/* Specs table */}
              <div className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden mb-8">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-brand-bg/50' : ''}>
                        <td className="py-3 px-4 text-brand-textMuted font-medium w-1/3">{key}</td>
                        <td className="py-3 px-4 text-brand-text">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CTA — Early access interest */}
              {!showForm && !formSubmitted && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center justify-center gap-2 w-full text-center py-4 rounded-lg text-black font-bold bg-brand-accent hover:bg-brand-accentHover transition-colors text-lg"
                >
                  <Mail className="w-5 h-5" />
                  Request Early Access
                </button>
              )}

              {/* Inline interest form */}
              {showForm && !formSubmitted && (
                <form onSubmit={handleSubmit} className="bg-brand-surface border border-brand-border rounded-lg p-6 space-y-4">
                  <h3 className="text-base font-semibold text-brand-text">Register your interest</h3>
                  <p className="text-xs text-brand-textMuted">
                    We'll email you when {product.name} is ready to order.
                  </p>
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-brand-textMuted mb-1">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm rounded bg-brand-bg border border-brand-border text-brand-text placeholder-brand-textMuted/50 focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-brand-textMuted mb-1">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm rounded bg-brand-bg border border-brand-border text-brand-text placeholder-brand-textMuted/50 focus:outline-none focus:border-brand-accent transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-brand-textMuted mb-1">Message (optional)</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm rounded bg-brand-bg border border-brand-border text-brand-text placeholder-brand-textMuted/50 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                      placeholder="Any questions or specific requirements?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-black font-bold bg-brand-accent hover:bg-brand-accentHover transition-colors text-sm"
                  >
                    Send Interest
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setFormData({ name: '', email: '', message: '' }); }}
                    className="w-full text-center text-xs text-brand-textMuted hover:text-brand-text transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              )}

              {/* Thank-you message */}
              {formSubmitted && (
                <div className="bg-brand-surface border border-brand-border rounded-lg p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto">
                    <Mail className="w-6 h-6 text-brand-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-brand-text">Thanks, we'll be in touch</h3>
                  <p className="text-sm text-brand-textMuted">
                    We've recorded your interest in <strong className="text-brand-text">{product.name}</strong>.
                    We'll email you at <strong className="text-brand-text">{formData.email}</strong> once
                    testing is complete and this product is ready to order.
                  </p>
                  <button
                    onClick={() => { setShowForm(false); setFormSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                    className="text-sm text-brand-accent hover:underline transition-colors"
                  >
                    Register interest in another product
                  </button>
                </div>
              )}

              {/* Alternative: direct email link */}
              <p className="text-brand-textMuted text-xs mt-4 text-center">
                Prefer email?{' '}
                <a
                  href={`mailto:hello@uk3dprints.com?subject=${encodeURIComponent(`Early access: ${product.name}`)}`}
                  className="text-brand-accent hover:underline"
                >
                  hello@uk3dprints.com
                </a>
              </p>
            </motion.div>
          </div>

          {/* ── FAQ Section ─────────────────────────────────────────── */}
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {allFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-brand-surface border border-brand-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-brand-text hover:text-brand-accent transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-brand-textMuted flex-shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-brand-textMuted flex-shrink-0 ml-2" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-sm text-brand-textMuted leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
