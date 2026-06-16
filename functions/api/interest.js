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

    // Try VPS collector — use fetch with explicit options
    const collectorUrl = 'http://192.248.163.88:9877';
    let collectorOk = false;
    let collectorError = null;
    try {
      const collectorRes = await fetch(collectorUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      collectorOk = collectorRes.ok;
      collectorError = collectorOk ? null : `status ${collectorRes.status}`;
    } catch (e) {
      collectorError = e.message;
    }

    // Fallback: log to CF logs regardless
    console.log('[interest]', JSON.stringify({
      product: data.product,
      name: data.name,
      email: data.email,
      message: data.message || '',
      collector: collectorOk ? 'ok' : collectorError,
    }));

    return new Response(JSON.stringify({ ok: true, stored: collectorOk, error: collectorError }), {
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
