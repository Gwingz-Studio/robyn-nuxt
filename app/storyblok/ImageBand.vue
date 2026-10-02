<script setup lang="ts">
const props = defineProps<{ blok: any }>()
const b = computed(() => props.blok)
</script>

<template>
  <section v-editable="b" :class="[...sectionClasses(b, 'sb-imageband'), 'full-bleed-home', `sb-imageband--${b.height || 'natural'}`, `sb-imageband--${b.fit || 'cover'}`]">
    <img v-if="b.image?.filename" :src="sbImg(b.image, 1920)" :srcset="`${sbImg(b.image, 1280)} 1280w, ${sbImg(b.image, 1920)} 1920w, ${sbImg(b.image, 2500)} 2500w`" sizes="100vw" :alt="b.image.alt || ''" loading="lazy">
  </section>
</template>
