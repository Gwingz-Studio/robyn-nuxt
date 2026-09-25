<script setup lang="ts">
const p = await useSiteCopy('special-dispatch')
useSeoPage({
  title: p.title,
  description: p.description,
  path: '/special-dispatch',
  ogImage: p.ogImage,
  jsonLd: collectionPageJsonLd({
    name: 'Special Dispatch',
    description: p.description,
    url: '/special-dispatch',
    items: p.dispatches.map((d: any) => ({ name: d.title, url: d.href, description: d.description })),
  }),
})
</script>

<template>
  <div>
    <p class="section__label plate--subtitle">{{ p.label }}</p>
    <h1 class="section__title">{{ p.h1 }}</h1>
    <p class="prose" style="margin-bottom: 2rem;">{{ p.intro }}</p>
    <ul class="post-grid">
      <li v-for="d in p.dispatches" :key="d.href">
        <a class="post-card" :href="d.href">
          <div class="post-card__thumb">
            <NuxtImg format="webp" :src="d.thumb" :alt="d.thumbAlt" loading="lazy" width="1200" height="630" densities="x1" />
          </div>
          <div class="post-card__body">
            <span class="badge" style="background:var(--gw-red);border-color:var(--gw-red);color:var(--gw-cream)">Special Dispatch № {{ d.num }}</span>
            <h2 class="post-card__title">{{ d.title }}</h2>
            <p class="post-card__desc">{{ d.description }}</p>
            <span class="post-card__more">Read →</span>
          </div>
        </a>
      </li>
    </ul>
    <p class="prose" style="margin-top: 2rem;">
      <a href="/indie-doc-journey">{{ p.back }}</a>
    </p>
  </div>
</template>
