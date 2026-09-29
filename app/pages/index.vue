<script setup lang="ts">
const p = await useSiteCopy('home')
useSeoPage({ title: 'Golden Wings', fullTitle: p.fullTitle, description: p.description, path: '/', jsonLd: homeJsonLd(p.description) })
useHead({ bodyAttrs: { class: 'is-home' } })
</script>

<template>
  <div class="page-home">
    <section class="hero full-bleed-home" aria-label="Golden Wings">
      <div class="hero__media" aria-hidden="true">
        <NuxtImg format="webp" class="hero__poster" :provider="mediaProvider(p.hero.poster)" :src="p.hero.poster" alt="" width="1920" height="1080" fetchpriority="high" densities="x1" />
        <StreamPlayer :video="p.hero.video" background title="Golden Wings synthetic-media 747 reel" :poster="p.hero.poster" iframe-class="hero__video" />
      </div>
      <p class="plate--title plate--dark hero__synth-label"><a href="#synthetic-media">{{ p.hero.synthLabel }}</a></p>
      <div class="hero__content">
        <div class="hero__lockup">
          <p class="hero__brand-mark">
            <NuxtImg format="webp" :provider="mediaProvider(p.hero.logo)" :src="p.hero.logo" :alt="p.hero.logoAlt" width="1200" height="336" densities="x1" />
          </p>
          <p class="plate--title"><span class="w-red">Stewardess</span> to <span class="w-blue">Sky Queen</span></p>
        </div>
        <h1 class="sr-only">{{ p.h1 }}</h1>
        <ol class="hero__timeline">
          <li v-for="t in p.hero.timeline" :key="t.year"><b>{{ t.year }}</b><span>{{ t.text }}</span></li>
        </ol>
        <div class="hero__ctas">
          <a class="btn btn--ghost" href="/film">{{ p.hero.secondaryCta }}</a>
        </div>
      </div>
      <div class="hero__laurels award-strip" aria-label="Festival wins">
        <NuxtImg format="webp" v-for="l in p.hero.laurels" :key="l.src" :src="l.src" :alt="l.alt" width="320" height="210" fit="inside" loading="lazy" />
      </div>
    </section>

    <section class="section archive-plate full-bleed-home" aria-labelledby="college-heading">
      <div class="archive-plate__inner">
        <div class="archive-plate__copy">
          <p class="section__label plate--subtitle">{{ p.archive.label }}</p>
          <h2 id="college-heading" class="section__title">{{ p.archive.title }}</h2>
          <p class="archive-plate__lede">{{ p.archive.lede }}</p>
          <div class="hero__ctas"><a class="btn btn--ghost" href="/stewardess-college-1968">{{ p.archive.cta }}</a></div>
        </div>
        <div class="archive-plate__frame">
          <div class="archive-plate__media">
            <NuxtImg format="webp" class="archive-plate__poster" :provider="mediaProvider(p.archive.poster)" :src="p.archive.poster" :alt="p.archive.alt" width="1635" height="925" sizes="xs:100vw md:800px" loading="lazy" decoding="async" />
            <StreamPlayer :video="p.archive.video" background :title="p.archive.alt" :poster="p.archive.poster" iframe-class="archive-plate__video" />
          </div>
        </div>
      </div>
    </section>

    <section class="section graduation-plate" aria-labelledby="grad-heading">
      <div class="graduation-plate__inner">
        <div class="graduation-plate__copy">
          <p class="section__label plate--subtitle">{{ p.graduation.label }}</p>
          <h2 id="grad-heading" class="section__title">{{ p.graduation.title }}</h2>
          <p class="graduation-plate__lede">{{ p.graduation.lede }}</p>
        </div>
        <figure class="graduation-plate__frame">
          <NuxtImg format="webp" class="graduation-plate__img" :provider="mediaProvider(p.graduation.image)" :src="p.graduation.image" :alt="p.graduation.alt" sizes="xs:100vw md:352px" loading="lazy" />
        </figure>
      </div>
    </section>

    <section id="crew" class="section crew-call full-bleed-home band-dark" aria-labelledby="crew-heading">
      <div class="crew-call__inner">
        <div class="crew-call__copy">
          <p class="section__label">{{ p.crew.label }}</p>
          <h2 id="crew-heading" class="section__title">{{ p.crew.title }}</h2>
          <p class="crew-call__lede">{{ p.crew.lede }}</p>
        </div>
        <CrewForm :copy="p.crew" />
      </div>
    </section>

    <section class="section poster-plate full-bleed-home" aria-labelledby="poster-heading">
      <div class="poster-plate__inner">
        <div class="poster-plate__copy">
          <p class="section__label plate--subtitle">{{ p.poster.label }}</p>
          <h2 id="poster-heading" class="section__title">{{ p.poster.title }}</h2>
          <p class="poster-plate__lede">{{ p.poster.lede }}</p>
          <div class="hero__ctas">
            <a class="btn btn--primary" :href="p.poster.src" download="GWSSQ_Poster_2026.png">{{ p.poster.download }}</a>
            <a class="btn btn--ghost" href="/press-kit">{{ p.poster.secondary }}</a>
          </div>
        </div>
        <a class="poster-plate__frame" :href="p.poster.src" download="GWSSQ_Poster_2026.png" aria-label="Download the official poster">
          <NuxtImg format="webp" class="poster-plate__img" :provider="mediaProvider(p.poster.src)" :src="p.poster.src" :alt="p.poster.alt" width="1083" height="1452" sizes="xs:100vw md:540px" loading="lazy" decoding="async" />
        </a>
      </div>
    </section>

    <section class="section" aria-labelledby="story-heading">
      <div class="story-split">
        <div>
          <p class="section__label plate--subtitle">{{ p.story.label }}</p>
          <h2 id="story-heading" class="section__title">{{ p.story.title }}</h2>
          <div class="prose">
            <p v-for="(para, i) in p.story.paragraphs" :key="i">{{ para }}</p>
          </div>
          <div class="hero__ctas" style="margin-top: 2rem;">
            <a class="btn btn--primary" href="/film">{{ p.story.primaryCta }}</a>
            <a class="btn btn--ghost" href="/indie-doc-journey">{{ p.story.secondaryCta }}</a>
          </div>
        </div>
        <ScreeningsCard />
      </div>
    </section>

    <section id="synthetic-media" class="section synth-note" aria-labelledby="synth-heading">
      <div class="synth-note__inner">
        <p class="section__label plate--subtitle">{{ p.synth.label }}</p>
        <h2 id="synth-heading" class="sr-only">{{ p.synth.label }}</h2>
        <p>{{ p.synth.text }}</p>
      </div>
    </section>
  </div>
</template>
