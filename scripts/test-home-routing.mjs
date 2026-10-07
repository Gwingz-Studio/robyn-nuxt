// node scripts/test-home-routing.mjs: which paths golden-wings-robyn-home keeps vs passes through.
import assert from 'node:assert/strict'
import { ownedByNuxt } from '../home-routing.mjs'
const own = ['/', '/film', '/film/', '/about-the-film', '/about-the-film/', '/press-kit', '/press-kit/', '/_nuxt/x.js', '/_nuxt/builds/meta/a.json', '/api/storyblok/story', '/fonts/AkiraExpanded-SuperBold.otf', '/fonts/MonumentExtended-Ultrabold.otf']
const pass = ['/people', '/people/', '/indie-doc-journey/', '/contact', '/sms-opt-in', '/optin', '/privacy-policy', '/terms-of-use', '/robots.txt', '/sitemap.xml', '/sitemap-0.xml', '/api/crew', '/api/sms', '/api', '/fonts/Airstream.woff2', '/images/press/robyn-headshot.jpg', '/favicon.ico', '/filmx', '/film/extra', '/Film', '//', '/caleb-blog-preview', '/_astro/a.css']
for (const p of own) assert.equal(ownedByNuxt(p), true, `should own ${p}`)
for (const p of pass) assert.equal(ownedByNuxt(p), false, `should pass ${p}`)
console.log(`home routing ok: ${own.length} owned, ${pass.length} passed through`)
