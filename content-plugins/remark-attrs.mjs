// Kramdown-style block attributes used by the ported Special Dispatch markdown:
//   "## Heading {#id}" and a paragraph whose last line is "{.class .other}".
// MDC only supports attributes on inline elements, so apply these to the block here.
const RE = /\s*\{((?:\s*[#.][\w-]+)+)\s*\}\s*$/
function apply(node, attrs) {
  const data = node.data || (node.data = {})
  const hp = data.hProperties || (data.hProperties = {})
  for (const t of attrs.trim().split(/\s+/)) {
    if (t[0] === '#') hp.id = t.slice(1)
    else hp.className = [...(hp.className || []), t.slice(1)]
  }
}
function walk(n) {
  if ((n.type === 'heading' || n.type === 'paragraph') && n.children?.length) {
    const last = n.children[n.children.length - 1]
    if (last.type === 'text') {
      const m = last.value.match(RE)
      if (m) {
        last.value = last.value.slice(0, m.index)
        apply(n, m[1])
        if (!last.value) n.children.pop()
        const prev = n.children[n.children.length - 1]
        if (prev?.type === 'break') n.children.pop()
      }
    }
  }
  if (n.children) for (const c of n.children) walk(c)
}
export default function remarkAttrs() { return (tree) => walk(tree) }
