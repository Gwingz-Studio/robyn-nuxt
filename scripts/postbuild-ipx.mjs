// Workers Static Assets answers "/_ipx/w_720&f_webp&q_78/..." with a 307 to the %26 form, and
// serves it as image/png (by extension). Rewriting prerendered references to the %26 form sends
// browsers straight to the Worker middleware, which returns 200 + image/webp + immutable caching.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.argv[2] || '.output/public'
const RE = /\/_ipx\/([^/"'\s<>]+)\//g
let files = 0, refs = 0
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f)
    if (['_ipx', 'images', 'blog', 'fonts', 'press', '_nuxt'].includes(f) && d === root) continue
    if (statSync(p).isDirectory()) { walk(p); continue }
    if (!/\.(html|json|xml)$/.test(f)) continue
    const t = readFileSync(p, 'utf8')
    const out = t.replace(RE, (_m, mods) => { refs++; return `/_ipx/${mods.replace(/&amp;|&|\\u0026/g, '%26')}/` })
    if (out !== t) { writeFileSync(p, out); files++ }
  }
}
walk(root)
console.log(`postbuild-ipx: rewrote ${refs} _ipx refs in ${files} files`)
