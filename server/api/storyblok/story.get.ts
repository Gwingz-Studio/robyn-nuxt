/**
 * Storyblok story for the four editable pages (/, /film, /about-the-film, /press-kit).
 *
 * Published content by default. Draft content only when the request carries a valid
 * Storyblok Visual Editor signature (_storyblok_tk: sha1(space_id:preview_token:timestamp),
 * at most one hour old), so drafts never leak to the public preview.
 * The delivery token stays on the server (NUXT_STORYBLOK_ACCESS_TOKEN, Worker secret).
 */
import { createHash } from 'node:crypto'
import { serverStoryblokClient } from '#storyblok/server'

const SLUGS = new Set(['home', 'film', 'about-the-film', 'press-kit'])
const SPACE_ID = '295612352463495'

function validEditorToken(q: Record<string, any>, accessToken: string): boolean {
  const spaceId = String(q['_storyblok_tk[space_id]'] ?? q._storyblok_tk?.space_id ?? '')
  const ts = String(q['_storyblok_tk[timestamp]'] ?? q._storyblok_tk?.timestamp ?? '')
  const token = String(q['_storyblok_tk[token]'] ?? q._storyblok_tk?.token ?? '')
  if (spaceId !== SPACE_ID || !/^\d+$/.test(ts) || !token) return false
  if (Number(ts) < Math.floor(Date.now() / 1000) - 3600) return false
  const expected = createHash('sha1').update(`${spaceId}:${accessToken}:${ts}`).digest('hex')
  return expected === token
}

export default defineEventHandler(async (event) => {
  const q = getQuery(event) as Record<string, any>
  const slug = String(q.slug || '')
  if (!SLUGS.has(slug)) throw createError({ statusCode: 404, statusMessage: 'Unknown story' })

  const accessToken = useRuntimeConfig(event).storyblok?.accessToken as string
  if (!accessToken) throw createError({ statusCode: 500, statusMessage: 'Storyblok token not configured' })

  const draft = validEditorToken(q, accessToken)
  const client = serverStoryblokClient(event)
  // Published: a one-minute cache key, so a publish shows up on the site within about a minute.
  const params: Record<string, any> = draft
    ? { version: 'draft', cv: Date.now() }
    : { version: 'published', cv: Math.floor(Date.now() / 60000) * 60 }
  try {
    const res: any = await client.get(`cdn/stories/${slug}`, params)
    setResponseHeader(event, 'cache-control', 'private, no-store')
    return { story: res.data.story, draft }
  }
  catch (e: any) {
    const status = e?.status || e?.response?.status || 502
    throw createError({ statusCode: status === 404 ? 404 : 502, statusMessage: `Storyblok fetch failed (${status})` })
  }
})
