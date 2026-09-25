<script setup lang="ts">
const p = await useSiteCopy('stewardess-college-1968')
useSeoPage({
  title: p.title,
  description: p.description,
  path: '/stewardess-college-1968',
  ogImage: p.poster,
  jsonLd: webPageJsonLd({
    name: p.title,
    description: p.description,
    url: '/stewardess-college-1968',
    about: { '@type': 'Movie', name: 'Golden Wings: Stewardess to Sky Queen', alternateName: 'Golden Wings' },
  }),
})
</script>

<template>
  <section class="section" aria-labelledby="college-page-heading">
    <p class="section__label plate--subtitle">{{ p.label }}</p>
    <h1 id="college-page-heading" class="section__title">{{ p.h1 }}</h1>
    <div class="prose" style="margin-top: 1.25rem;">
      <p>{{ p.lede }}</p>
    </div>

    <div class="archive-plate__frame archive-plate__frame--page">
      <div class="archive-plate__media">
        <NuxtImg format="webp" class="archive-plate__poster" :src="p.poster" :alt="p.alt" width="1635" height="925" sizes="xs:100vw md:1100px" loading="eager" decoding="async" />
        <StreamPlayer :video="p.video" :title="p.alt" :poster="p.poster" iframe-class="archive-plate__video" />
      </div>
    </div>

    <div class="hero__ctas" style="margin-top: 2rem;">
      <a v-for="(c, i) in p.ctas" :key="c.href" :class="['btn', i === 0 ? 'btn--primary' : 'btn--ghost']" :href="c.href">{{ c.text }}</a>
    </div>
  </section>
</template>
