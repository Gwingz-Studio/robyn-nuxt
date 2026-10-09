/** Routes whose content comes from Storyblok (server-rendered on the Worker, not prerendered). */
export const STORYBLOK_ROUTES = ['/', '/film', '/about-the-film', '/press-kit']

/** /videos and /videos/<slug>: Storyblok video stories, server-rendered like the pages above. */
export function isVideoPath(path: string): boolean {
  return /^\/videos(\/[^/]+)?$/.test(path.replace(/\/+$/, ''))
}
