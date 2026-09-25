<script setup lang="ts">
const p = await useSiteCopy('not-found')
useSeoPage({ title: p.title, description: p.description, path: '/404' })
useHead({ meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <section class="hero" style="min-height: 50vh;">
    <h1 class="hero__headline">{{ p.h1 }}</h1>
    <p class="hero__lede">{{ p.lede }}</p>
    <div class="hero__ctas">
      <a class="btn btn--primary" href="/">Home</a>
      <a class="btn btn--ghost" href="/indie-doc-journey">Journey</a>
    </div>
  </section>
</template>
