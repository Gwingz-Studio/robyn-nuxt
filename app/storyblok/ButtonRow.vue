<script setup lang="ts">
const props = defineProps<{ blok: any }>()
const b = computed(() => props.blok)
const href = computed(() => {
  const h = sbHref(b.value.image_link)
  return h && allowedLink('', h) ? h : ''
})
</script>

<template>
  <section v-editable="b" :class="sectionClasses(b, 'sb-buttonrow')" :style="sectionStyle(b)">
    <div :class="['sb-wrap', b.align === 'left' ? '' : 'sb-wrap--center']">
      <h2 v-if="b.heading" class="sb-title sb-title--monument">{{ b.heading }}</h2>
      <component :is="href ? 'a' : 'div'" v-if="b.image?.filename" :href="href || undefined" class="sb-buttonrow__media">
        <img :src="sbImg(b.image, 360)" :srcset="sbSrcset(b.image, 360)" :alt="b.image.alt || ''" loading="lazy">
      </component>
      <SbButtons :buttons="b.buttons" :align="b.align === 'left' ? 'left' : 'center'" />
    </div>
  </section>
</template>
