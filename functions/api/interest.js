/**
 * UK3D Prints — Interest Form API
 *
 * Accepts POST from the early-access form and forwards to the VPS collector.
 */
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

    // Forward to VPS collector
    const collectorUrl = 'http://192.248.163.88:9877';
    let collectorOk = false;
    try {
      const collectorRes = await fetch(collectorUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      collectorOk = collectorRes.ok;
      if (!collectorOk) {
        const text = await collectorRes.text();
        console.error('[interest] collector returned', collectorRes.status, text);
      }
    } catch (e) {
      console.error('[interest] collector unreachable:', e.message);
    }

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
