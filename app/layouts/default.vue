<script setup lang="ts">
const route = useRoute()
const chrome = await useSiteCopy('chrome')
const isHome = computed(() => route.path === '/')
// Storyblok-edited pages draw their own full-bleed sections.
const isStoryblok = computed(() => STORYBLOK_ROUTES.includes(route.path.replace(/\/+$/, '') || '/') || isVideoPath(route.path))
</script>

<template>
  <div class="site-shell">
    <a class="sr-only" href="#main">Skip to content</a>
    <SiteHeader :chrome="chrome" />
    <main id="main" :class="['site-main', { 'site-main--home': isHome && !isStoryblok, 'site-main--sb': isStoryblok }]">
      <slot />
    </main>
    <SiteFooter :chrome="chrome" />
  </div>
</template>
