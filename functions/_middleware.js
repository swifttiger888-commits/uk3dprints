/**
 * Cache-Control middleware for UK3D Prints
 *
 * The @cloudflare/vite-plugin Workers asset handler overrides _headers
 * for the SPA root path. This middleware restores it.
 */
export async function onRequest(context) {
  const response = await context.next();
  const url = new URL(context.request.url);

  // Root and product HTML pages — short edge cache + stale-while-revalidate
  if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname.startsWith('/product/')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, stale-while-revalidate=86400'
    );
  }

  return response;
}
