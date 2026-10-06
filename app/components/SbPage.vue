<script setup lang="ts">
/**
 * Page shell for the Storyblok-edited routes. Published story on the public site; draft story
 * (and live updates through the Storyblok bridge) when opened inside the Storyblok Visual Editor.
 * After the editable blocks the page always renders exactly one gwingz.com band (site rule).
 */
const props = defineProps<{ slug: string, band: string, path: string, kind: 'home' | 'film' | 'about' | 'press-kit' }>()
const route = useRoute()

// Only the Visual Editor's signed params are forwarded; the server checks the signature.
const tk = computed(() => {
  const q = route.query
  const out: Record<string, string> = {}
  for (const k of ['_storyblok_tk[space_id]', '_storyblok_tk[timestamp]', '_storyblok_tk[token]']) {
    if (typeof q[k] === 'string') out[k] = q[k] as string
  }
  // The story open in the Visual Editor (used by the server only with a valid signature).
  if (typeof q._storyblok === 'string' && /^\d+$/.test(q._storyblok) && out['_storyblok_tk[token]']) out.id = q._storyblok
  return out
})

const { data, error } = await useAsyncData(`sb-${props.slug}`, () =>
  $fetch<{ story: any, draft: boolean }>('/api/storyblok/story', { query: { slug: props.slug, ...tk.value } }))
if (error.value || !data.value?.story) {
  throw createError({ statusCode: error.value?.statusCode || 500, statusMessage: 'Page content unavailable', fatal: true })
}

const story = ref<any>(data.value.story)
const content = computed(() => story.value?.content || {})
/*
 * Page-level HERO VIDEO (Storyblok field `background_image`, renamed by Caleb). When set it is the
 * page's hero, like the old Squarespace hero (muted autoplay loop, cover, no controls):
 *  - page has a hero block: a video replaces that block's background_video (its photo stays as the
 *    poster/fallback); an image becomes the hero's photo (the block's own video, if any, still plays).
 *  - no hero block: a video-only hero (existing Hero block, "tall") is rendered at the top.
 * Empty field = the blocks exactly as authored. The field is no longer a page background image.
 */
const VIDEO_URL = /\.(mp4|webm|mov|m4v|m3u8)(\?|#|$)/i
const pageMedia = computed(() => {
  const asset = content.value.background_image
  const url = String(asset?.filename || '').trim()
  if (!url) return null
  return { url, asset, isVideo: /^[a-f0-9]{32}$/i.test(url) || VIDEO_URL.test(url) }
})
const body = computed<any[]>(() => {
  const list = (content.value.body || []).filter((b: any) => b && b.component)
  const m = pageMedia.value
  if (!m) return list
  const apply = (h: any) => m.isVideo ? { ...h, background_video: m.url } : { ...h, background_image: m.asset }
  const i = list.findIndex((b: any) => b.component === 'hero')
  if (i >= 0) return list.map((b: any, j: number) => j === i ? apply(b) : b)
  const pageHero = { component: 'hero', _uid: `page-hero-${story.value?.id || props.slug}`, title: '', show_title: false, height: 'tall', laurels: [], logo: { filename: '' }, background_image: { filename: '' }, background_video: '' }
  return [apply(pageHero), ...list]
})

// About the Film sits on the slate ground of mockup v2 (this used to come from the page background
// image field, which is now the hero video).
const darkGround = computed(() => props.slug === 'about-the-film')

// SEO from the story's SEO fields (seeded with the site's existing titles/descriptions).
const seo = content.value
const title = seo.seo_title || undefined
const description = seo.seo_description || undefined
const ogImage = seo.og_image?.filename ? sbOriginal(seo.og_image) : undefined
const desc = description || DEFAULT_DESCRIPTION
const jsonLd = props.kind === 'home' ? homeJsonLd(desc)
  : props.kind === 'film' ? movieJsonLd(desc, ogImage)
    : props.kind === 'about' ? aboutPageJsonLd(desc)
      : webPageJsonLd({ name: title || 'Press Kit', description: desc, url: props.path })
useSeoPage({
  title: props.kind === 'home' ? 'Golden Wings' : title,
  fullTitle: props.kind === 'home' ? title : undefined,
  description,
  path: props.path,
  ogImage,
  ogType: props.kind === 'film' ? 'video.other' : undefined,
  jsonLd,
})

onMounted(() => {
  if (!route.query._storyblok) return
  useStoryblokBridge(story.value.id, (s: any) => { story.value = s })
})

defineExpose({ story })
</script>

<template>
  <div
    v-editable="content"
    :class="['sb-page', `sb-page--${slug}`, darkGround ? 'sb-page--bg' : '']"
  >
    <StoryblokComponent v-for="blok in body" :key="blok._uid" :blok="blok" />
    <GwingzBand :page="band" />
  </div>
</template>
