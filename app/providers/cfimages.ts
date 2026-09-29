/**
 * @nuxt/image provider for Cloudflare Images (imagedelivery.net). The image id is the site path without
 * the leading slash (e.g. "blog/859d5c9e8a6d.png"). Requested widths map to the named width variants
 * gwr480 / gwr640 / gwr960 / gwr1280 / gwr1920 (fit scale-down, never upscale); format is negotiated by
 * Cloudflare (WebP/AVIF), so the `format` modifier is ignored.
 */
import { defineProvider } from '@nuxt/image/runtime'

const WIDTHS = [480, 640, 960, 1280, 1920]

export default defineProvider<{ baseURL?: string }>({
  getImage(src, { modifiers, baseURL = 'https://imagedelivery.net/UG5iXh0kt-Kh8TQH83WpkA' }) {
    const w = Number(modifiers?.width) || 0
    const v = (w && WIDTHS.find(x => x >= w)) || WIDTHS[WIDTHS.length - 1]
    return { url: `${baseURL.replace(/\/+$/, '')}/${src.replace(/^\//, '')}/gwr${v}` }
  },
})
