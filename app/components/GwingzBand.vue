<script setup lang="ts">
/**
 * The one gwingz.com invitation per page. Rendered by SbPage after the editable blocks, never
 * by a block, so an editor cannot remove it, move it up the page, or add a second one.
 * Heading and button text come from the Storyblok "Site settings" story (band_heading,
 * band_button_text); the link, UTM params and placement stay in code.
 * Empty or unreachable settings fall back to the [CALEB WRITES] placeholder.
 */
const props = defineProps<{ page: string }>()
const href = computed(() => watchUrl(`${props.page}-band`))
const PLACEHOLDER = '[CALEB WRITES]'
const route = useRoute()

// Same Visual Editor signature forwarding as SbPage: draft settings only inside the editor.
const tk: Record<string, string> = {}
for (const k of ['_storyblok_tk[space_id]', '_storyblok_tk[timestamp]', '_storyblok_tk[token]']) {
  if (typeof route.query[k] === 'string') tk[k] = route.query[k] as string
}

const { data } = await useAsyncData('sb-site-settings', () =>
  $fetch<{ story: any }>('/api/storyblok/story', { query: { slug: 'site-settings', ...tk } }).catch(() => null))

const settings = ref<any>(data.value?.story || null)
const heading = computed(() => String(settings.value?.content?.band_heading || '').trim() || PLACEHOLDER)
const button = computed(() => String(settings.value?.content?.band_button_text || '').trim() || PLACEHOLDER)

// Live preview while the Site settings story is open in the Storyblok Visual Editor.
onMounted(() => {
  if (!route.query._storyblok || !settings.value?.id) return
  useStoryblokBridge(settings.value.id, (s: any) => { settings.value = s })
})
</script>

<template>
  <section class="gw-band full-bleed-home" data-offer="gwingz.com" aria-labelledby="gw-band-heading">
    <div class="gw-band__inner">
      <h2 id="gw-band-heading" class="gw-band__title">{{ heading }}</h2>
      <a class="sb-btn sb-btn--primary gw-band__btn" :href="href" rel="noopener">{{ button }}</a>
    </div>
  </section>
</template>
