<script setup lang="ts">
// :watch-cta{placement="optin" text="Send me the link"}  => gwingz.com first-cut button with UTM placement
const props = withDefaults(defineProps<{ placement: string, text?: string, ghost?: boolean }>(), { text: 'Watch the first cut, free', ghost: false })
const href = computed(() => watchUrl(props.placement))
</script>

<template>
  <a :class="['btn', ghost ? 'btn--ghost' : 'btn--primary']" :href="href" rel="noopener noreferrer">{{ text }}</a>
</template>
