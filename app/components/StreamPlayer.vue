<script setup lang="ts">
/** Cloudflare Stream player. `background` = muted autoplay loop (hero/archive plates). */
const props = withDefaults(defineProps<{ video: string, title?: string, poster?: string, background?: boolean, iframeClass?: string }>(), {
  title: 'Golden Wings video',
  background: false,
})
const uid = computed(() => STREAM_VIDEOS[props.video] || props.video)
const src = computed(() => streamIframeSrc(uid.value, { background: props.background, poster: shareImageUrl(props.poster) }))
</script>

<template>
  <div :class="['stream-embed', { 'stream-embed--bg': background }]">
    <iframe
      :class="iframeClass"
      :src="src"
      :title="title"
      loading="lazy"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen
      :tabindex="background ? -1 : undefined"
      :aria-hidden="background ? 'true' : undefined"
    />
  </div>
</template>
