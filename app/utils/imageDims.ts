/**
 * Pixel size of images whose URL does not carry it (Squarespace CDN laurels), so the page can
 * give them width/height attributes and nothing jumps while they load. Server-side only: reads
 * the first 1 KB of each image (HTTP Range) and the size from the file header. Anything that
 * fails or is slow is simply left without a size, exactly as before.
 */
export type Dims = { width: number, height: number }

const u16be = (b: Uint8Array, i: number) => (b[i]! << 8) | b[i + 1]!
const u16le = (b: Uint8Array, i: number) => b[i]! | (b[i + 1]! << 8)
const u24le = (b: Uint8Array, i: number) => b[i]! | (b[i + 1]! << 8) | (b[i + 2]! << 16)
const u32be = (b: Uint8Array, i: number) => ((b[i]! << 24) >>> 0) + (b[i + 1]! << 16) + (b[i + 2]! << 8) + b[i + 3]!
const tag = (b: Uint8Array, i: number, s: string) => s.split('').every((c, k) => b[i + k] === c.charCodeAt(0))

/** Width and height from a PNG, GIF, WebP or JPEG file header. */
export function sniffDims(b: Uint8Array): Dims | undefined {
  let d: Dims | undefined
  if (b.length >= 24 && b[0] === 0x89 && tag(b, 1, 'PNG') && tag(b, 12, 'IHDR')) d = { width: u32be(b, 16), height: u32be(b, 20) }
  else if (b.length >= 10 && tag(b, 0, 'GIF8')) d = { width: u16le(b, 6), height: u16le(b, 8) }
  else if (b.length >= 30 && tag(b, 0, 'RIFF') && tag(b, 8, 'WEBP')) {
    if (tag(b, 12, 'VP8X')) d = { width: u24le(b, 24) + 1, height: u24le(b, 27) + 1 }
    else if (tag(b, 12, 'VP8 ')) d = { width: u16le(b, 26) & 0x3fff, height: u16le(b, 28) & 0x3fff }
    else if (tag(b, 12, 'VP8L') && b[20] === 0x2f) {
      const bits = b[21]! | (b[22]! << 8) | (b[23]! << 16) | (b[24]! << 24)
      d = { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 }
    }
  }
  else if (b.length >= 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue }
      const m = b[i + 1]!
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) { d = { width: u16be(b, i + 7), height: u16be(b, i + 5) }; break }
      i += 2 + u16be(b, i + 2)
    }
  }
  return d && d.width > 0 && d.height > 0 ? d : undefined
}

/** Sizes for the given image URLs (as displayed), fetched in parallel with a short time limit. */
export async function probeDims(urls: string[], timeoutMs = 1200): Promise<Record<string, Dims>> {
  const out: Record<string, Dims> = {}
  if (!import.meta.server || !urls.length) return out
  const signal = AbortSignal.timeout(timeoutMs)
  await Promise.allSettled([...new Set(urls)].map(async (url) => {
    const res = await fetch(url, { headers: { Range: 'bytes=0-1023' }, signal, cf: { cacheTtl: 2592000 } } as RequestInit)
    if (!res.ok) return
    const d = sniffDims(new Uint8Array(await res.arrayBuffer()))
    if (d) out[url] = d
  }))
  return out
}
