/** Published video stories for the /videos index (no drafts, ever). */
import { publishedVideos, videoInfo } from '../../utils/videos'

export default defineEventHandler(async (event) => {
  try {
    const stories = await publishedVideos(event)
    setResponseHeader(event, 'cache-control', 'private, no-store')
    return { videos: await Promise.all(stories.map(videoInfo)) }
  }
  catch (e: any) {
    const status = e?.status || e?.response?.status || 502
    throw createError({ statusCode: 502, statusMessage: `Storyblok fetch failed (${status})` })
  }
})
