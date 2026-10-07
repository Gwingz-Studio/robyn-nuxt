// Which requests the production Worker golden-wings-robyn-home answers itself (see home-worker.mjs).
// Everything else passes through, untouched, to the live Worker golden-wings-robyn.
const PAGES = new Set(['/', '/film', '/about-the-film', '/press-kit'])
// Fonts the Storyblok pages use that the live site does not have (the shared ones are byte-identical on live).
const OWN_FILES = new Set(['/fonts/AkiraExpanded-SuperBold.otf', '/fonts/MonumentExtended-Ultrabold.otf'])

export function ownedByNuxt(pathname) {
  if (pathname === '/') return true
  // "/film" and "/film/" both land here; Nuxt answers "/film/" with one 301 to "/film" (no loop).
  if (PAGES.has(pathname.replace(/\/+$/, ''))) return true
  if (pathname.startsWith('/_nuxt/')) return true
  if (pathname === '/api/storyblok' || pathname.startsWith('/api/storyblok/')) return true
  return OWN_FILES.has(pathname)
}
