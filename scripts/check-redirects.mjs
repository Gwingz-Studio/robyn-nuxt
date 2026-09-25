// Verifies every rule in server/redirects.json is a single 301 hop to a 200 page.
// Usage: node scripts/check-redirects.mjs https://golden-wings-robyn-nuxt.<sub>.workers.dev
import rules from '../server/redirects.json' with { type: 'json' }
const base = (process.argv[2] || 'http://localhost:8787').replace(/\/$/, '')
let fail = 0
for (const [from, rule] of Object.entries(rules)) {
  const r = await fetch(base + from, { redirect: 'manual' })
  const loc = r.headers.get('location') || ''
  const target = new URL(loc, base)
  const same = target.origin === new URL(base).origin
  const r2 = same ? await fetch(target, { redirect: 'manual' }) : { status: 'external' }
  const ok = r.status === 301 && (r2.status === 200 || r2.status === 'external')
  if (!ok) fail++
  console.log(`${ok ? 'OK ' : 'BAD'}\t${r.status}\t${from}\t->\t${loc}\t${r2.status}`)
}
console.log(`${Object.keys(rules).length - fail}/${Object.keys(rules).length} single-hop`)
process.exit(fail ? 1 : 0)
