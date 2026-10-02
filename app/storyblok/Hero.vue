<script setup lang="ts">
const props = defineProps<{ blok: any }>()
const b = computed(() => props.blok)
const poster = computed(() => sbImg(b.value.background_image, 1920))
const laurels = computed(() => (b.value.laurels || []).filter((a: any) => a?.filename))
</script>

<template>
  <section v-editable="b" :class="['sb-hero', 'full-bleed-home', `sb-hero--${b.height || 'full'}`]">
    <div class="sb-hero__media" aria-hidden="true">
      <img v-if="poster" class="sb-hero__poster" :src="poster" :srcset="sbSrcset(b.background_image, 1440)" alt="" fetchpriority="high">
      <SbVideo v-if="b.background_video" :video="b.background_video" :poster="poster" background title="" />
    </div>
    <div class="sb-hero__inner">
      <h1 v-if="b.title" :class="b.show_title ? 'sb-hero__title' : 'sr-only'">{{ b.title }}</h1>
      <div v-if="laurels.length" class="sb-hero__laurels" aria-label="Festival laurels">
        <img v-for="l in laurels" :key="l.filename" :src="sbImg(l, 320)" :srcset="sbSrcset(l, 320)" :alt="l.alt || ''" loading="eager">
      </div>
      <img v-if="b.logo?.filename" class="sb-hero__logo" :src="sbImg(b.logo, 960)" :srcset="sbSrcset(b.logo, 960)" :alt="b.logo.alt || ''">
    </div>
  </section>
</template>
