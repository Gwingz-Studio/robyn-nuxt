/** Cloudflare Stream videos (public info/trailer clips, no signed URLs). */
export const STREAM_CUSTOMER = 'customer-e46l63ee4ck01nmz'
export const STREAM_VIDEOS: Record<string, string> = {
  hero: '4e7c5b8d7d630b53adbe054f3bebed30', // 747-synth-broll-reel.mp4 (home hero loop)
  college: '6a89f9b65ba8ad0590a183c9d6ebba4e', // stewardess-college-1968.mp4
  trailer: '68ad5b65dd4b00c8a72f28c5b27b0f96', // golden-wings-trailer.mp4 (About)
}

export function streamIframeSrc(uid: string, opts: { background?: boolean, poster?: string, title?: string } = {}) {
  const q = new URLSearchParams()
  if (opts.background) {
    q.set('autoplay', 'true'); q.set('muted', 'true'); q.set('loop', 'true'); q.set('controls', 'false')
  }
  q.set('preload', 'metadata')
  if (opts.poster) q.set('poster', opts.poster.startsWith('http') ? opts.poster : `https://golden-wings-robyn.com${opts.poster}`)
  return `https://${STREAM_CUSTOMER}.cloudflarestream.com/${uid}/iframe?${q.toString()}`
}

/**
 * Forgiving Cloudflare Stream ID reader for editor fields: accepts a bare 32-hex Video ID, or any
 * pasted Stream URL / iframe embed code (cloudflarestream.com or videodelivery.net) and pulls the
 * ID out. Returns '' when no Stream ID is found.
 */
export function streamIdFrom(input: unknown): string {
  const s = String(input ?? '').trim()
  if (/^[a-f0-9]{32}$/i.test(s)) return s.toLowerCase()
  const m = s.match(/(?:cloudflarestream\.com|videodelivery\.net)\/([a-f0-9]{32})(?=[/?#"'\s&]|$)/i)
  return m ? m[1]!.toLowerCase() : ''
}

/**
 * Normalise an editor's video field: a Stream ID (bare, URL or embed code) becomes the bare ID;
 * any other http(s) URL (.mp4, .m3u8, ...) is kept; anything else is ignored ('').
 */
export function videoSource(input: unknown): string {
  const id = streamIdFrom(input)
  if (id) return id
  const s = String(input ?? '').trim()
  return /^https?:\/\/\S+$/i.test(s) ? s : ''
}
