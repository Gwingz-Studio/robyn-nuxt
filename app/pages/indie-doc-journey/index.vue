<script setup lang="ts">
const p = await useSiteCopy('indie-doc-journey')
const { data: posts } = await useAsyncData('journey-posts', () => queryCollection('blog').select('path', 'title', 'description', 'tags', 'rawbody').all())
const list = computed(() => (posts.value || [])
  .map((x: any) => ({ ...x, slug: x.path.split('/').pop(), display: displayTitle(x.title), img: firstImageRaw(x.rawbody), tags: x.tags || [] }))
  .sort((a, b) => a.display.localeCompare(b.display)))
const active = ref('All')
const dc = p.dispatchCard
useSeoPage({
  title: p.title,
  description: p.description,
  path: '/indie-doc-journey',
  jsonLd: collectionPageJsonLd({
    name: 'Indie Doc Journey',
    description: p.description,
    url: '/indie-doc-journey',
    items: [
      { name: dc.name, url: dc.href, description: dc.jsonLdDescription },
      ...list.value.map(x => ({ name: x.display, url: `/indie-doc-journey/${x.slug}`, description: x.description || undefined })),
    ],
  }),
})
const shown = (tags: string[]) => active.value === 'All' || tags.includes(active.value)
</script>

<template>
  <div>
    <p class="section__label plate--subtitle">{{ p.label }}</p>
    <h1 class="section__title" style="display:inline-flex;align-items:center;gap:1rem">
      {{ p.h1 }} <img src="/images/brand/logo-mark-wink.png" alt="" style="height:1.6em;width:auto">
    </h1>
    <p class="prose" style="margin-bottom: 1.5rem;">{{ p.intro }}</p>

    <div class="journey-filters" role="toolbar" aria-label="Filter posts by tag">
      <button v-for="tag in p.filters" :key="tag" type="button" :class="['journey-filters__btn', { 'is-active': active === tag }]" :data-filter="tag" @click="active = tag">{{ tag }}</button>
    </div>

    <ul id="journey-grid" class="post-grid">
      <li v-show="shown(['Special Dispatch'])" data-tags="Special Dispatch">
        <a class="post-card" :href="dc.href">
          <div class="post-card__thumb"><span class="post-card__thumb--empty">Special Dispatch</span></div>
          <div class="post-card__body">
            <span class="badge" style="background:var(--gw-red);border-color:var(--gw-red);color:var(--gw-cream)">{{ dc.badge }}</span>
            <h2 class="post-card__title">{{ dc.title }}</h2>
            <p class="post-card__desc">{{ dc.desc }}</p>
            <span class="post-card__more">Read →</span>
          </div>
        </a>
      </li>
      <li v-for="post in list" v-show="shown(post.tags)" :key="post.slug" :data-tags="post.tags.join('|') || 'All'">
        <a class="post-card" :href="`/indie-doc-journey/${post.slug}`">
          <div class="post-card__thumb">
            <NuxtImg format="webp" v-if="post.img && post.img.startsWith('/')" :provider="mediaProvider(post.img)" :src="post.img" alt="" width="480" loading="lazy" />
            <img v-else-if="post.img" :src="post.img" alt="" loading="lazy">
            <span v-else class="post-card__thumb--empty">Golden Wings</span>
          </div>
          <div class="post-card__body">
            <span v-if="post.tags.includes('From the Galley')" class="badge" style="background:var(--gw-red);border-color:var(--gw-red);color:var(--gw-cream)">From the Galley</span>
            <h2 class="post-card__title">{{ post.display }}</h2>
            <p v-if="post.description" class="post-card__desc">{{ post.description }}</p>
            <span class="post-card__more">Read →</span>
          </div>
        </a>
      </li>
    </ul>

    <aside class="journey-share" aria-labelledby="journey-share-heading">
      <h2 id="journey-share-heading" class="section__title">{{ p.share.title }}</h2>
      <p class="prose" style="margin:0;">{{ p.share.text }}</p>
      <a class="btn btn--ghost" href="/#crew">{{ p.share.cta }}</a>
    </aside>
  </div>
</template>
