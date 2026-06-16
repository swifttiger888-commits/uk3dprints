/**
 * Stripe Webhook handler
 *
 * POST /api/stripe-webhook
 * Receives stripe webhook events (checkout.session.completed, etc.)
 *
 * Requires STRIPE_WEBHOOK_SECRET set as Cloudflare Pages env var.
 */
import Stripe from 'stripe';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' },
    });
  }

  const secretKey = env.STRIPE_SECRET_KEY;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return new Response(
      JSON.stringify({ error: 'Stripe not configured' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  try {
    const stripe = Stripe(secretKey, {
      apiVersion: '2025-02-24.acacia',
    });

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const productId = session.metadata?.productId;

        console.log('[stripe] payment completed', JSON.stringify({
          sessionId: session.id,
          productId,
          email: session.customer_details?.email,
          amount: session.amount_total,
          currency: session.currency,
        }));

        // TODO: send order notification (email, webhook, etc.)
        break;
      }

      case 'checkout.session.expired': {
        console.log('[stripe] session expired', event.data.object.id);
        break;
      }

      default: {
        console.log('[stripe] unhandled event type:', event.type);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
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
