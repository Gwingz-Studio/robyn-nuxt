/** Same title cleanup the Astro blog templates used. */
export function displayTitle(raw: string) {
  return String(raw)
    .replace(/\s*\(Copy\)\s*$/i, '')
    .replace(/Golden Wings:\s*(Fifty|50)\s*Year\s*Flight\s*Path/gi, 'Golden Wings')
    .replace(/\b(Fifty|50)\s*Year\s*Flight\s*Path\b/gi, 'Golden Wings')
    .trim()
}

/** First image in a markdown body (minimark AST or raw string). */
export function firstImage(body: unknown): string | null {
  let found: string | null = null
  const walk = (n: any) => {
    if (found || !n) return
    if (Array.isArray(n)) {
      if (n[0] === 'img' && n[1]?.src) { found = n[1].src; return }
      for (const c of n) walk(c)
    } else if (typeof n === 'object') {
      if (n.tag === 'img' && n.props?.src) { found = n.props.src; return }
      walk(n.value ?? n.children)
    }
  }
  walk(body)
  return found
}

/** Exact port of the Astro Journey thumbnail picker (regex on the raw markdown). */
export function firstImageRaw(body: string | undefined): string | null {
  const m = body?.match(/!\[[^\]]*\]\(([^)\s]+)/) || body?.match(/<img[^>]+src=["']([^"']+)/i)
  return m ? m[1]! : null
}
