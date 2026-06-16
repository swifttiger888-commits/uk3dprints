/**
 * UK3D Prints — Interest Form API
 *
 * Accepts POST from the early-access form and stores submissions.
 * Uses Cloudflare Tunnel to reach the VPS collector (HTTPS required
 * from Cloudflare edge — plain HTTP to raw IPs is blocked with 403).
 */
const COLLECTOR_URL = 'https://powers-exceptions-pierce-introduce.trycloudflare.com';

export async function onRequest(context) {
  const { request } = context;

  // CORS preflight
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

  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.product) {
      return new Response(
        JSON.stringify({ error: 'name, email, and product are required' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    // Forward to VPS collector via Cloudflare Tunnel
    let collectorOk = false;
    let collectorError = null;
    try {
      const collectorRes = await fetch(COLLECTOR_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      collectorOk = collectorRes.ok;
      collectorError = collectorOk ? null : `status ${collectorRes.status}`;
    } catch (e) {
      collectorError = e.message;
    }

    // Log to Cloudflare logs regardless (backup)
    console.log('[interest]', JSON.stringify({
      product: data.product,
      name: data.name,
      email: data.email,
      message: data.message || '',
      stored: collectorOk,
      error: collectorError,
    }));

    return new Response(JSON.stringify({ ok: true, stored: collectorOk }), {
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
