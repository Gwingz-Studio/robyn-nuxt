/**
 * Edge rules for the Worker (runs before anything else):
 *  1. Legacy redirects (server/redirects.json, source of truth): one hop, query preserved.
 *  2. Trailing slash -> 301 to the no-slash canonical form (single hop).
 *  3. Serve prerendered HTML + public files from the ASSETS binding with cache headers,
 *     a branded 404, and X-Robots-Tag noindex on non-production Workers.
 * During prerender (Node) there is no ASSETS binding, so step 3 is skipped.
 */
import redirects from '../redirects.json'

type Rule = { target: string, status: number }
const RULES = redirects as Record<string, Rule>

const IMAGE_RE = /\.(png|jpe?g|gif|webp|avif|svg|ico)$/i

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname
  if (path.startsWith('/api/') || path === '/api') return

  const norm = path === '/' ? '/' : (path.replace(/\/+$/, '') || '/')
  const rule = RULES[norm]
  if (rule) {
    const loc = /^https?:\/\//i.test(rule.target) ? rule.target : `${url.origin}${rule.target}${url.search}`
    return new Response(null, { status: rule.status, headers: { location: loc, 'cache-control': 'public, max-age=3600' } })
  }
  if (norm !== path) {
    return new Response(null, { status: 301, headers: { location: `${url.origin}${norm}${url.search}`, 'cache-control': 'public, max-age=3600' } })
  }

  const env = (event.context as any).cloudflare?.env
  if (!env?.ASSETS) return
  const method = event.method
  if (method !== 'GET' && method !== 'HEAD') return

  // Asset server canonicalizes "&" in _ipx paths to %26 with a 307; ask for the encoded form directly.
  const assetUrl = new URL(url.toString())
  if (path.startsWith('/_ipx/')) assetUrl.pathname = path.replace(/&/g, '%26')
  const assetReq = new Request(assetUrl.toString(), { method, headers: toWebRequest(event).headers })
  let res: Response = await env.ASSETS.fetch(assetReq)
  let status = res.status
  if (status === 404 || path === '/404') {
    const nf: Response = await env.ASSETS.fetch(new Request(`${url.origin}/404`, { method }))
    res = nf
    status = 404
  }

  const h = new Headers(res.headers)
  if (env.SITE_ENV !== 'production') h.set('X-Robots-Tag', 'noindex, nofollow')
  if (path.startsWith('/_ipx/')) {
    if (path.includes('f_webp')) h.set('content-type', 'image/webp')
    h.set('cache-control', 'public, max-age=31536000, immutable')
  } else if (path.startsWith('/fonts/')) {
    h.set('access-control-allow-origin', '*')
    h.set('access-control-allow-methods', 'GET, HEAD, OPTIONS')
    h.set('cross-origin-resource-policy', 'cross-origin')
    h.set('cache-control', 'public, max-age=31536000, immutable')
  } else if (IMAGE_RE.test(path) || /\.(pdf|woff2?|ttf|otf)$/i.test(path)) {
    h.set('cache-control', 'public, max-age=604800, stale-while-revalidate=86400')
  } else if ((h.get('content-type') || '').includes('text/html')) {
    h.set('content-type', 'text/html; charset=utf-8')
    h.set('cache-control', 'public, max-age=0, must-revalidate')
  }
  return new Response(res.body, { status, statusText: status === 404 ? 'Not Found' : res.statusText, headers: h })
})
