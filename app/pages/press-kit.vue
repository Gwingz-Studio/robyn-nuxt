<script setup lang="ts">
const p = await useSiteCopy('press-kit')
useSeoPage({ title: p.title, description: p.description, path: '/press-kit', jsonLd: webPageJsonLd({ name: 'Press Kit', description: p.description, url: '/press-kit' }) })
// tiny inline-markdown helper for *italic* in frontmatter strings
const em = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*([^*]+)\*/g, '<em>$1</em>')
</script>

<template>
  <div>
    <p class="section__label plate--subtitle">{{ p.label }}</p>
    <h1 class="section__title">{{ p.h1 }}</h1>
    <p class="prose" style="margin-bottom:1.5rem" v-html="em(p.intro)" />
    <div class="hero__ctas">
      <a class="btn btn--primary" href="/contact">{{ p.ctas.screener }}</a>
      <a class="btn btn--ghost" :href="p.ctas.epkHref">{{ p.ctas.epk }}</a>
    </div>

    <section class="section" aria-labelledby="synopsis-heading">
      <p class="section__label plate--subtitle">{{ p.synopsis.label }}</p>
      <h2 id="synopsis-heading" class="section__title">{{ p.synopsis.title }}</h2>
      <div class="prose"><p>{{ p.synopsis.text }}</p></div>
    </section>

    <section class="section" aria-labelledby="pr-heading">
      <div class="pk-grid-2">
        <div>
          <p class="section__label plate--subtitle">{{ p.release.label }}</p>
          <h2 id="pr-heading" class="section__title">{{ p.release.title }}</h2>
          <p class="prose">{{ p.release.lede }}</p>
          <p style="display:flex;gap:.5rem;flex-wrap:wrap">
            <span v-for="(b, i) in p.release.badges" :key="b" :class="['badge', { 'badge--outline': i > 0 }]">{{ b }}</span>
          </p>
        </div>
        <div class="prose">
          <p v-for="(para, i) in p.release.paragraphs" :key="i" v-html="em(para)" />
        </div>
      </div>
    </section>

    <section class="band-dark full-bleed-home" aria-label="Quotes">
      <div style="max-width:var(--max);margin-inline:auto;padding-inline:var(--gutter);display:grid;gap:var(--sp-7)">
        <blockquote v-for="q in p.quotes" :key="q.by" class="quote">
          <div><p>{{ q.text }}</p><footer>{{ q.by }}</footer></div>
        </blockquote>
      </div>
    </section>

    <section class="section" aria-labelledby="credits-heading">
      <p class="section__label plate--subtitle">{{ p.credits.label }}</p>
      <h2 id="credits-heading" class="section__title">{{ p.credits.title }}</h2>
      <div class="pk-grid-2">
        <div class="prose">
          <p v-for="s in p.credits.subjects" :key="s.name">
            <strong>{{ s.name }}</strong><template v-if="s.badge"> <span class="badge">{{ s.badge }}</span></template><br>{{ s.text }}
          </p>
        </div>
        <div>
          <div v-for="[r, n] in p.credits.crew" :key="r" class="crew-row"><span>{{ r }}</span><span>{{ n }}</span></div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="laurels-heading">
      <p class="section__label plate--subtitle">{{ p.laurels.label }}</p>
      <h2 id="laurels-heading" class="section__title">{{ p.laurels.title }}</h2>
      <p class="prose" style="margin-bottom:1.5rem">{{ p.laurels.intro }}</p>
      <div class="pk-grid-3">
        <div v-for="l in p.laurels.items" :key="l.festival + l.award" class="laurel-card">
          <div style="display:flex;justify-content:space-between;align-items:center"><span class="badge">Award</span><span class="laurel-card__meta">{{ l.year }}</span></div>
          <div class="laurel-card__award">{{ l.award }}</div>
          <div class="laurel-card__fest">{{ l.festival }}</div>
          <div v-if="l.meta" class="laurel-card__meta">{{ l.meta }}</div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="stills-heading">
      <p class="section__label plate--subtitle">{{ p.stills.label }}</p>
      <h2 id="stills-heading" class="section__title">{{ p.stills.title }}</h2>
      <p class="prose" style="margin-bottom:1.5rem">{{ p.stills.intro }}</p>
      <div class="pk-grid-3">
        <figure v-for="s in p.stills.items" :key="s.src" class="still-card">
          <NuxtImg format="webp" :provider="mediaProvider(s.src)" :src="s.src" :alt="s.caption" width="640" loading="lazy" />
          <figcaption><span>{{ s.caption }}</span><span class="still-card__credit"><span>{{ p.stills.credit }}</span><a :href="s.src" download>↓ Download</a></span></figcaption>
        </figure>
      </div>
      <div class="pk-grid-3" style="margin-top:var(--sp-5)">
        <div v-for="d in p.stills.downloads" :key="d.title" class="dl-card">
          <p class="section__label">{{ d.label }}</p>
          <div class="dl-card__title">{{ d.title }}</div>
          <p class="dl-card__note">{{ d.note }}</p>
          <a :class="['btn', d.primary ? 'btn--primary' : 'btn--ghost']" :href="d.href" :download="d.download ? '' : undefined">{{ d.cta }}</a>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="posters-heading">
      <p class="section__label plate--subtitle">{{ p.posters.label }}</p>
      <h2 id="posters-heading" class="section__title">{{ p.posters.title }}</h2>
      <p class="prose" style="margin-bottom:1.5rem">{{ p.posters.intro }}</p>
      <div class="poster-gallery">
        <a v-for="f in p.posters.files" :key="f" :href="`/images/posters/${f}`" target="_blank" rel="noopener">
          <NuxtImg format="webp" :provider="mediaProvider(`/images/posters/${f}`)" :src="`/images/posters/${f}`" :alt="p.posters.alt" width="480" loading="lazy" />
        </a>
      </div>
    </section>
  </div>
</template>
