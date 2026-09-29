/**
 * Heavy media that no longer lives in public/ (Prompt 5, see media/manifest.json):
 *  - `images`: display copies in Cloudflare Images, image id = site path without the leading slash.
 *  - `r2`: byte-exact originals in R2 (golden-wings-robyn-media), still served at their old URLs by the Worker.
 */
import manifest from '~~/media/manifest.json'

const CF_IMAGES = new Set<string>(manifest.images)
const R2_FILES = new Set<string>(manifest.r2)

export const CF_IMAGES_BASE = `https://imagedelivery.net/${manifest.cfImagesHash}`

/** NuxtImg `provider` for a src: 'cfimages' for media moved to Cloudflare Images, default (ipxStatic) otherwise. */
export function mediaProvider(src?: string | null): string | undefined {
  return src && CF_IMAGES.has(src) ? 'cfimages' : undefined
}

/** Cloudflare Images delivery URL for a moved file (variant defaults to the account's existing `public`). */
export function cfImageUrl(src: string, variant = 'public'): string {
  return `${CF_IMAGES_BASE}/${src.replace(/^\//, '')}/${variant}`
}

/** For og:image and video posters: files that now exist only in Cloudflare Images get their Images URL;
 *  files still served at their own URL (repo or R2) keep it. */
export function shareImageUrl(src?: string): string | undefined {
  if (!src) return src
  return CF_IMAGES.has(src) && !R2_FILES.has(src) ? cfImageUrl(src, 'public') : src
}
