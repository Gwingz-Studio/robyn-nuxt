<script setup lang="ts">
const p = await useSiteCopy('contact')
useSeoPage({ title: p.title, description: p.description, path: '/contact', jsonLd: contactPageJsonLd(p.description) })
</script>

<template>
  <section class="contact-panel">
    <p class="section__label plate--subtitle">{{ p.label }}</p>
    <h1 class="section__title">{{ p.h1 }}</h1>
    <p class="script page-motto">{{ p.motto }}</p>

    <div class="contact-audiences" role="list">
      <template v-for="a in p.audiences" :key="a.label">
        <div class="crew-row" role="listitem">
          <span>{{ a.label }}</span>
          <span><a :href="a.href">{{ a.text }}</a></span>
        </div>
        <p v-if="a.hint" class="contact-audiences__hint">{{ a.hint }}</p>
      </template>
    </div>

    <div class="hero__ctas" style="margin-top: 2rem;">
      <a class="btn btn--ghost" :href="watchUrl('contact')" rel="noopener noreferrer">{{ p.cta }}</a>
    </div>

    <div style="margin-top: var(--sp-7); max-width: 28rem;">
      <ScreeningsCard />
    </div>
  </section>
</template>
