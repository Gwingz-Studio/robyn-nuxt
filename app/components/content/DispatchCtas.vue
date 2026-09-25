<script setup lang="ts">
const props = defineProps<{ variant?: string }>()
const page = inject<any>('dispatch-page', null)
</script>

<template>
  <div v-if="props.variant === 'top'" class="hero__ctas" style="margin: 1.5rem 0 2rem;">
    <a class="btn btn--primary" :href="page?.pdf" download>Download: Banned on Christmas Eve (PDF)</a>
    <a class="btn btn--ghost" href="#part-1">Jump to Part 1</a>
  </div>
  <p v-else style="margin-top: 2.5rem;">
    <a class="btn btn--primary" :href="page?.pdf" download>Download PDF</a>
    {{ ' ' }}
    <a v-if="page?.part2" class="btn btn--ghost" :href="page.part2">Part 2 (court win)</a>
    {{ ' ' }}
    <a class="btn btn--ghost" href="/special-dispatch">All Special Dispatches</a>
  </p>
</template>
