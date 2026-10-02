<script setup lang="ts">
/**
 * The one gwingz.com invitation per page. Rendered by SbPage after the editable blocks, never
 * by a block, so an editor cannot remove it, move it up the page, or add a second one.
 * Copy is Caleb's to write: placeholders until he does.
 */
const props = defineProps<{ page: string }>()
const href = computed(() => watchUrl(`${props.page}-band`))
</script>

<template>
  <section class="gw-band full-bleed-home" data-offer="gwingz.com" aria-labelledby="gw-band-heading">
    <div class="gw-band__inner">
      <h2 id="gw-band-heading" class="gw-band__title">[CALEB WRITES]</h2>
      <a class="sb-btn sb-btn--primary gw-band__btn" :href="href" rel="noopener">[CALEB WRITES]</a>
    </div>
  </section>
</template>
