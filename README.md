# golden-wings-robyn.com (Nuxt rebuild)

Nuxt 4 + Nuxt Content 3, fully prerendered, deployed to Cloudflare Workers (`cloudflare_module`).
Preview Worker: `golden-wings-robyn-nuxt` (workers.dev only, noindex). The live Worker is untouched.

## Edit copy
All copy is markdown in `content/`:
- `content/site/*.md`: home, film, contact, press kit, people index, journey index, dispatch index, 1968 archive, screenings card, 404, header/footer (`chrome.md`)
- `content/pages/*.md`: about, legal, sms-opt-in, 8 campaign pages
- `content/blog/*.md`: Indie Doc Journey posts; `content/people/*.md`: bios; `content/special-dispatch/*.md`

## Commands
```
npm install
npm run build            # nuxt build + postbuild-ipx
npm run lint:copy        # em dashes, AI-generated, caleb@, mojibake in rendered HTML
npx wrangler deploy      # preview Worker (wrangler.jsonc)
node scripts/check-redirects.mjs <preview-url>
```
Redirects: `server/redirects.json` (single hop). Edge rules: `server/middleware/00.edge.ts`.
Forms: `server/api/crew.ts`, `server/api/sms.ts` via the `FORMS_MAIL` send_email binding (`[PREVIEW]` subject prefix unless `FORM_ENV=production`).
Videos: Cloudflare Stream ids in `app/utils/stream.ts`.
Cutover (not done): set `SITE_ENV`/`FORM_ENV` to `production`, build with `SITE_ENV=production`, add routes. See CHANGES.md.
