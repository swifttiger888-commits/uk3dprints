import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-4 py-1.5 rounded-full">
            Early Access — Invite Only
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight"
        >
          3D Printed{' '}
          <span className="text-brand-accent">Gaming</span>{' '}
          & Desk Accessories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-brand-textMuted text-lg max-w-2xl mx-auto mb-3"
        >
          Designed and printed in the UK. Black PLA. No middleman.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-brand-textMuted text-base max-w-xl mx-auto mb-8"
        >
          We're getting our printer dialled in and testing the first batch.
          Request an invite to be among the first to order when we launch.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#products"
            className="px-8 py-3 text-base font-semibold rounded text-black bg-brand-accent hover:bg-brand-accentHover transition-colors"
          >
            Browse Products
          </a>
          <a
            href="mailto:hello@uk3dprints.com?subject=Early%20Access%20Interest"
            className="px-8 py-3 text-base font-semibold rounded border border-brand-border text-brand-text hover:border-brand-accent transition-colors"
          >
            Request Invite
          </a>
        </motion.div>
      </div>
    </section>
  );
}
