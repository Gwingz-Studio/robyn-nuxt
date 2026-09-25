// Scans rendered HTML for banned copy: em dashes, "AI-generated", caleb@, and mojibake.
// Usage: node scripts/copy-lint.mjs .output/public   (exit 1 on any hit)
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.argv[2] || '.output/public'
const RULES = [
  ['em dash', /\u2014|&mdash;|&#8212;|&#x2014;/gi],
  ['AI-generated', /AI[-\s]generated/gi],
  ['caleb@', /caleb@/gi],
  ['mojibake', /Ã.|â€|Â[^\w\s]|Γ[ÇÄ]|├|┌|╖|ΓÇ|ï¿½|\uFFFD/g],
  ['Get Booked', /Get Booked/g],
]
const files = []
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (f === '_ipx' || f === 'images' || f === 'blog') continue; statSync(p).isDirectory() ? walk(p) : /\.(html|json|xml|txt)$/.test(f) && !/^dump\./.test(f) && files.push(p) } }
walk(root)
let hits = 0
for (const f of files) {
  const t = readFileSync(f, 'utf8')
  for (const [name, re] of RULES) {
    for (const m of t.matchAll(re)) {
      hits++
      console.log(`${name}\t${f}\t…${t.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, ' ')}…`)
    }
  }
}
console.log(`copy-lint: ${files.length} files, ${hits} hits`)
process.exit(hits ? 1 : 0)
