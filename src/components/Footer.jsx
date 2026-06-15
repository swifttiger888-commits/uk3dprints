import React from 'react';

export default function Footer() {
  return (
    <footer id="about" className="bg-brand-surface border-t border-brand-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <span className="font-bold text-xl tracking-tight">
              <span className="text-brand-text">UK</span><span className="text-brand-accent">3D</span>
              <span className="text-brand-textMuted text-sm ml-1">Prints</span>
            </span>
            <p className="text-brand-textMuted text-sm mt-3 leading-relaxed">
              3D printed gaming accessories, sim racing gear, and desk organisation.
              Designed, printed, and shipped from the UK.
            </p>
          </div>

          {/* How it works */}
          <div>
            <h4 className="text-sm font-semibold text-brand-text uppercase tracking-wider mb-4">How It Works</h4>
            <ol className="text-brand-textMuted text-sm space-y-2">
              <li>1. You order — we print it fresh</li>
              <li>2. Ships within 2-3 working days</li>
              <li>3. Free UK delivery over £20</li>
              <li>4. Printed on Creality SPARKX i7</li>
            </ol>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-brand-text uppercase tracking-wider mb-4">Contact</h4>
            <ul className="text-brand-textMuted text-sm space-y-2">
              <li>
                <a href="mailto:hello@uk3dprints.com" className="hover:text-brand-accent transition-colors">
                  hello@uk3dprints.com
                </a>
              </li>
              <li>UK-based · Ships to UK only</li>
              <li>14-day returns</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-border mt-12 pt-6 text-center text-brand-textMuted text-xs">
          &copy; {new Date().getFullYear()} UK3D Prints. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
