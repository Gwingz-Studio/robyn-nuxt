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
const body = computed<any[]>(() => (content.value.body || []).filter((b: any) => b && b.component))

const pageBg = computed(() => content.value.background_image?.filename ? { backgroundImage: `linear-gradient(rgba(51, 63, 72, 0.84), rgba(51, 63, 72, 0.84)), url("${sbImg(content.value.background_image, 1920)}")` } : undefined)

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
    :class="['sb-page', `sb-page--${slug}`, content.background_image?.filename ? 'sb-page--bg' : '']"
    :style="pageBg"
  >
    <StoryblokComponent v-for="blok in body" :key="blok._uid" :blok="blok" />
    <GwingzBand :page="band" />
  </div>
</template>
