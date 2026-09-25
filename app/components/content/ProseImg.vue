<script setup lang="ts">
// Markdown images: serve a resized WebP preview; originals stay at their old URLs.
const props = defineProps<{ src?: string, alt?: string, width?: string | number, height?: string | number }>()
const isLocal = computed(() => !!props.src && props.src.startsWith('/') && /\.(png|jpe?g|webp)$/i.test(props.src))
</script>

<template>
  <NuxtImg format="webp" v-if="isLocal" :src="src" :alt="alt || ''" width="960" densities="x1 x2" loading="lazy" decoding="async" />
  <img v-else :src="src" :alt="alt || ''" :width="width" :height="height" loading="lazy">
</template>
