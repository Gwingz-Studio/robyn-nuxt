<script setup lang="ts">
// Markdown images: serve a resized WebP preview (IPX, or Cloudflare Images for media moved off the repo).
const props = defineProps<{ src?: string, alt?: string, width?: string | number, height?: string | number }>()
const isLocal = computed(() => !!props.src && props.src.startsWith('/') && /\.(png|jpe?g|webp)$/i.test(props.src))
</script>

<template>
  <NuxtImg format="webp" v-if="isLocal" :provider="mediaProvider(src)" :src="src" :alt="alt || ''" width="960" densities="x1 x2" loading="lazy" decoding="async" />
  <img v-else :src="src" :alt="alt || ''" :width="width" :height="height" loading="lazy">
</template>
