<script setup lang="ts">
const p = await useSiteCopy('film')
useSeoPage({ title: p.title, description: p.description, path: '/film', ogType: 'video.other', ogImage: p.ogImage, jsonLd: movieJsonLd(p.description, p.ogImage) })
</script>

<template>
  <div>
    <section class="hero" aria-label="Film">
      <p class="section__label">{{ p.hero.label }}</p>
      <h1 class="hero__headline">{{ p.hero.h1 }}</h1>
      <p class="hero__lede">{{ p.hero.lede }}</p>
      <div class="hero__ctas">
        <a class="btn btn--primary" :href="watchUrl('film-hero')" rel="noopener noreferrer">{{ p.hero.primaryCta }}</a>
        <a class="btn btn--ghost" href="/about-the-film">{{ p.hero.secondaryCta }}</a>
      </div>
    </section>

    <section id="first-cut" class="section section--watch full-bleed-home" aria-labelledby="first-cut-heading">
      <p class="section__label">{{ p.firstCut.label }}</p>
      <h2 id="first-cut-heading" class="section__title">{{ p.firstCut.title }}</h2>
      <p class="section__lede">{{ p.firstCut.lede }}</p>
      <div class="hero__ctas" style="margin-top: 1.5rem;">
        <a class="btn btn--primary" :href="watchUrl('film-band')" rel="noopener noreferrer">{{ p.firstCut.cta }}</a>
      </div>
      <p class="section--watch__fine">{{ p.firstCut.fine }}</p>
    </section>

    <section class="section">
      <p class="section__label plate--subtitle">{{ p.synopsis.label }}</p>
      <h2 class="section__title">{{ p.synopsis.title }}</h2>
      <div class="prose">
        <p v-for="(para, i) in p.synopsis.paragraphs" :key="i">{{ para }}</p>
      </div>
    </section>
  </div>
</template>
