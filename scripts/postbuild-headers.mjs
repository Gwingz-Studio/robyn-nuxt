// Preview builds only (SITE_ENV !== 'production'): add X-Robots-Tag to every static file via
// Workers Static Assets _headers. Pages also get it from server/middleware/00.edge.ts at runtime.
// (Kept out of Nuxt routeRules because @nuxtjs/sitemap filters out noindex-header routes.)
import { appendFileSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const file = join(process.argv[2] || '.output/public', '_headers')
if (process.env.SITE_ENV === 'production') {
  console.log('postbuild-headers: production build, no X-Robots-Tag added')
} else {
  const cur = existsSync(file) ? readFileSync(file, 'utf8') : ''
  if (/^\/\*\n\s+X-Robots-Tag: noindex, nofollow$/m.test(cur)) {
    console.log('postbuild-headers: preview X-Robots-Tag already present')
  } else {
    appendFileSync(file, `${cur && !cur.endsWith('\n') ? '\n' : ''}/*\n  X-Robots-Tag: noindex, nofollow\n`)
    console.log('postbuild-headers: added preview X-Robots-Tag to _headers')
  }
}