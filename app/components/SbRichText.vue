<script setup lang="ts">
const props = defineProps<{ doc: any, tag?: string }>()
const html = computed(() => richTextHtml(props.doc))
</script>

<template>
  <component :is="tag || 'div'" v-if="html" class="sb-rt" v-html="html" />
</template>
