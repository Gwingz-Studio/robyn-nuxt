<script setup lang="ts">
const props = defineProps<{ blok: any }>()
const b = computed(() => props.blok)
const images = computed(() => (b.value.images || []).filter((a: any) => a?.filename))
const style = computed(() => b.value.style || 'captioned')
const cols = computed(() => Number(b.value.columns) || (style.value === 'posters' ? 4 : 3))
const w = computed(() => (style.value === 'captioned' && images.value.length <= 2 ? 480 : 640))
</script>

<template>
  <section v-editable="b" :class="sectionClasses(b, `sb-gallery sb-gallery--${style}`)" :style="sectionStyle(b)">
    <div class="sb-wrap">
      <p v-if="b.eyebrow" class="sb-eyebrow">{{ b.eyebrow }}</p>
      <h2 v-if="b.heading" :class="['sb-title', 'sb-title--monument', { 'sb-plate': b.heading_plate }]">{{ b.heading }}</h2>
      <p v-if="b.intro" class="sb-intro">{{ b.intro }}</p>
      <div class="sb-gallery__grid" :style="{ '--cols': cols }">
        <figure v-for="img in images" :key="img.filename" class="sb-gallery__item">
          <a v-if="style === 'posters'" :href="sbOriginal(img)" target="_blank" rel="noopener">
            <img :src="sbImg(img, 480)" :srcset="sbSrcset(img, 480)" :alt="img.alt || ''" loading="lazy">
          </a>
          <img v-else :src="sbImg(img, w)" :srcset="sbSrcset(img, w)" :alt="img.alt || ''" loading="lazy">
          <figcaption v-if="style === 'stills'" class="sb-gallery__cap">
            <span>{{ img.title }}</span>
            <span class="sb-gallery__credit"><span v-if="b.credit">{{ b.credit }}</span><a v-if="b.download_label" :href="sbOriginal(img)" download>{{ b.download_label }}</a></span>
          </figcaption>
          <figcaption v-else-if="img.title && style === 'captioned'" class="sb-caption">{{ img.title }}</figcaption>
        </figure>
      </div>
      <SbRichText :doc="b.body" class="sb-gallery__body" />
    </div>
  </section>
</template>
