/**
 * Storyblok story for the four editable pages (/, /film, /about-the-film, /press-kit),
 * plus the non-routable `site-settings` story (gwingz band copy) used by GwingzBand.
 *
 * Published content by default. Draft content only when the request carries a valid
 * Storyblok Visual Editor signature (_storyblok_tk: sha1(space_id:preview_token:timestamp),
 * at most one hour old), so drafts never leak to the public preview.
 * The delivery token stays on the server (NUXT_STORYBLOK_ACCESS_TOKEN, Worker secret).
 */
import { serverStoryblokClient } from '#storyblok/server'
import { validEditorToken } from '../../utils/sbEditor'

const SLUGS = new Set(['home', 'film', 'about-the-film', 'press-kit', 'site-settings'])

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
    // Inside the Visual Editor (signed draft only) render the story being edited, by its ID, so
    // any page story can be previewed at a page route (e.g. a throwaway test story). Non-page
    // stories (Site settings) and unknown IDs fall back to the route's own story.
    const editId = String(q.id || '')
    if (draft && /^\d{1,20}$/.test(editId)) {
      try {
        const byId: any = await client.get(`cdn/stories/${editId}`, params)
        if (byId?.data?.story?.content?.component === 'page') {
          setResponseHeader(event, 'cache-control', 'private, no-store')
          return { story: byId.data.story, draft }
        }
      }
      catch { /* fall through to the route's story */ }
    }
    const res: any = await client.get(`cdn/stories/${slug}`, params)
    setResponseHeader(event, 'cache-control', 'private, no-store')
    return { story: res.data.story, draft }
  }
  catch (e: any) {
    const status = e?.status || e?.response?.status || 502
    throw createError({ statusCode: status === 404 ? 404 : 502, statusMessage: `Storyblok fetch failed (${status})` })
  }
})
