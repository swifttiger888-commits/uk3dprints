/**
 * Stripe Checkout Session creator
 *
 * POST /api/create-checkout
 * Body: { productId: string }
 * Returns: { url: string } — redirect user to this Stripe Checkout URL
 *
 * Requires STRIPE_SECRET_KEY set as Cloudflare Pages env var.
 */
import Stripe from 'stripe';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' },
    });
  }

  const secretKey = env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return new Response(
      JSON.stringify({ error: 'Stripe not configured' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    const { productId } = await request.json();
    if (!productId) {
      return new Response(
        JSON.stringify({ error: 'productId is required' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    // Load product data to get the Stripe price ID
    // Since we can't import JSON dynamically easily, use the inline map
    const PRICE_IDS = {
      'steering-wheel': env.STRIPE_PRICE_STEERING_WHEEL,
      'webcam-cover': env.STRIPE_PRICE_WEBCAM_COVER,
      'cable-clips': env.STRIPE_PRICE_CABLE_CLIPS,
      'nameplate': env.STRIPE_PRICE_NAMEPLATE,
      'headphone-hook': env.STRIPE_PRICE_HEADPHONE_HOOK,
    };

    const priceId = PRICE_IDS[productId];
    if (!priceId) {
      return new Response(
        JSON.stringify({ error: 'Unknown product' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    const stripe = Stripe(secretKey, {
      apiVersion: '2025-02-24.acacia',
    });

    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/product/${productId}/?payment=success`,
      cancel_url: `${origin}/product/${productId}/`,
      shipping_address_collection: { allowed_countries: ['GB'] },
      metadata: { productId },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
