/**
 * Google video sitemap: one <url> per PUBLISHED video story (/videos/<slug>), with its Stream
 * player, thumbnail, duration and upload date. Submit https://golden-wings-robyn.com/sitemap-videos.xml
 * in Search Console. Drafts never appear here.
 */
import { publishedVideos, videoInfo, type VideoInfo } from '../utils/videos'

const SITE = 'https://golden-wings-robyn.com'
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export default defineEventHandler(async (event) => {
  let items: VideoInfo[] = []
  try { items = await Promise.all((await publishedVideos(event)).map(videoInfo)) }
  catch { throw createError({ statusCode: 503, statusMessage: 'Video list unavailable' }) }
  const urls = items.filter(v => v.title && v.thumbnail && v.embedUrl).map((v) => {
    const parts = [
      `<video:thumbnail_loc>${esc(v.thumbnail)}</video:thumbnail_loc>`,
      `<video:title>${esc(v.title)}</video:title>`,
      `<video:description>${esc((v.description || v.title).slice(0, 2048))}</video:description>`,
      `<video:player_loc>${esc(v.embedUrl)}</video:player_loc>`,
      v.seconds ? `<video:duration>${v.seconds}</video:duration>` : '',
      v.uploadDate ? `<video:publication_date>${esc(v.uploadDate.replace(/Z$/, '+00:00'))}</video:publication_date>` : '',
    ].filter(Boolean).join('')
    return `<url><loc>${SITE}${esc(v.path)}</loc><video:video>${parts}</video:video></url>`
  })
  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=300')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${urls.join('\n')}${urls.length ? '\n' : ''}</urlset>\n`
})
