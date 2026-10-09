/**
 * One video story (folder "videos") for /videos/<slug>. Published only; the draft only for a
 * signed Storyblok Visual Editor request, so unpublished videos 404 on the public site.
 */
import { serverStoryblokClient } from '#storyblok/server'
import { validEditorToken } from '../../utils/sbEditor'
import { videoInfo } from '../../utils/videos'

export default defineEventHandler(async (event) => {
  const q = getQuery(event) as Record<string, any>
  const slug = String(q.slug || '')
  if (!/^[a-z0-9][a-z0-9-]{0,99}$/.test(slug)) throw createError({ statusCode: 404, statusMessage: 'Unknown video' })

  const accessToken = useRuntimeConfig(event).storyblok?.accessToken as string
  if (!accessToken) throw createError({ statusCode: 500, statusMessage: 'Storyblok token not configured' })

  const draft = validEditorToken(q, accessToken)
  const client = serverStoryblokClient(event)
  const params: Record<string, any> = draft
    ? { version: 'draft', cv: Date.now() }
    : { version: 'published', cv: Math.floor(Date.now() / 60000) * 60 }
  setResponseHeader(event, 'cache-control', 'private, no-store')

  let story: any = null
  const editId = String(q.id || '')
  if (draft && /^\d{1,20}$/.test(editId)) {
    try {
      const byId: any = await client.get(`cdn/stories/${editId}`, params)
      if (byId?.data?.story?.content?.component === 'video') story = byId.data.story
    }
    catch { /* fall back to the slug */ }
  }
  if (!story) {
    try {
      const res: any = await client.get(`cdn/stories/videos/${slug}`, params)
      story = res?.data?.story
    }
    catch (e: any) {
      const status = e?.status || e?.response?.status || 502
      throw createError({ statusCode: status === 404 ? 404 : 502, statusMessage: status === 404 ? 'Unknown video' : `Storyblok fetch failed (${status})` })
    }
  }
  if (story?.content?.component !== 'video') throw createError({ statusCode: 404, statusMessage: 'Unknown video' })
  return { story, info: await videoInfo(story), draft }
})
