import { fileURLToPath } from 'node:url'
import remarkAttrs from './content-plugins/remark-attrs.mjs'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// SITE_ENV=production only at cutover. Anything else builds a noindex preview.
const isProd = process.env.SITE_ENV === 'production'
const redirects = JSON.parse(fs.readFileSync(path.resolve('server/redirects.json'), 'utf8')) as Record<string, unknown>

// Every content route, prerendered (sitemap source + prerender seeds).
const md = (dir: string) => fs.readdirSync(path.resolve('content', dir)).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))
const contentRoutes = [
  '/', '/film', '/contact', '/press-kit', '/people', '/indie-doc-journey', '/special-dispatch', '/stewardess-college-1968',
  ...md('pages').map(s => `/${s}`),
  ...md('people').map(s => `/people/${s}`),
  ...md('blog').map(s => `/indie-doc-journey/${s}`),
  ...md('special-dispatch').map(s => `/special-dispatch/${s}`),
]
for (const r of contentRoutes) if (redirects[r]) throw new Error(`Redirect key collides with a real page: ${r}`)

export default defineNuxtConfig({
  compatibilityDate: '2026-07-22',
  devtools: { enabled: false },
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/robots', '@nuxtjs/sitemap', 'nuxt-link-checker'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico?v=a1ace0d', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=a1ace0d' },
        { rel: 'preload', href: '/fonts/Airstream.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Condensed:wght@400;500;700&display=swap' },
      ],
      // Meta Pixel Code (Caleb, 2026-09-29): script and noscript text exactly as given.
      script: [
        { innerHTML: "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '26876203855319594'); fbq('track', 'PageView');" },
      ],
      noscript: [
        { innerHTML: ' <img height="1" width="1" src="https://www.facebook.com/tr?id=26876203855319594&ev=PageView&noscript=1"/>' },
      ],
    },
  },

  site: {
    url: 'https://golden-wings-robyn.com',
    name: 'Golden Wings',
    trailingSlash: false,
    indexable: isProd,
  },
  robots: {
    // Preview: disallow all (indexable=false). Production: allow all + sitemap.
    sitemap: ['https://golden-wings-robyn.com/sitemap.xml'],
  },
  sitemap: {
    autoLastmod: false,
    excludeAppSources: true,
    urls: contentRoutes,
    exclude: ['/404', '/optin'],
  },
  linkChecker: {
    enabled: true,
    failOnError: false,
    report: { html: false, markdown: true },
  },

  content: {
    experimental: { sqliteConnector: 'native' },
    // Astro rendered markdown with smartypants (curly quotes, ellipses); keep that. Dashes off: no new em dashes.
    build: { markdown: { toc: { depth: 3 }, remarkPlugins: { 'remark-smartypants': { dashes: false }, [fileURLToPath(new URL('./content-plugins/remark-attrs.mjs', import.meta.url)).replace(/\\/g, '/')]: { instance: remarkAttrs } } } },
    renderer: { anchorLinks: false },
  },

  image: {
    provider: 'ipxStatic',
    format: ['webp'],
    quality: 78,
    densities: [1, 2],
    screens: { xs: 320, sm: 480, md: 768, lg: 1024, xl: 1280, xxl: 1536, '2xl': 1536 },
    // Heavy media moved off the repo (media/manifest.json) is shown through Cloudflare Images.
    providers: {
      cfimages: { provider: '~/providers/cfimages.ts', options: { baseURL: 'https://imagedelivery.net/UG5iXh0kt-Kh8TQH83WpkA' } },
    },
  },

  routeRules: {
    // Preview X-Robots-Tag is NOT a route rule: @nuxtjs/sitemap drops every URL whose route rules
    // carry a noindex X-Robots-Tag header, which left /sitemap.xml empty. Pages get the header from
    // server/middleware/00.edge.ts; static files get it from scripts/postbuild-headers.mjs (_headers).
    '/fonts/**': { headers: { 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=31536000, immutable' } },
    '/images/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
    '/blog/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: { deployConfig: false, nodeCompat: true },
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: false,
      failOnError: true,
      routes: [...contentRoutes, '/404', '/robots.txt', '/sitemap.xml'],
      ignore: [
        '/api',
        '/cdn-cgi',
        (p: string) => !!redirects[p.replace(/\/+$/, '') || '/'],
        /^\/indie-doc-journey\/(category|tag)\//,
      ],
    },
    rollupConfig: { external: ['cloudflare:email'] },
  },
})
