/**
 * Stripe configuration for client-side code.
 * Publishable key comes from VITE_STRIPE_PUBLISHABLE_KEY env var.
 */
export const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

export const stripeConfigured = STRIPE_PUBLISHABLE_KEY.startsWith('pk_');
