<script setup lang="ts">
const p = await useSiteCopy('people')
const { data: people } = await useAsyncData('people-all', () => queryCollection('people').order('order', 'ASC').all())
const list = computed(() => (people.value || []).map((x: any) => ({ ...(x.meta || {}), ...x, slug: x.path.split('/').pop() })))
function initials(name: string) {
  return name.split(/\s+/).filter(w => /^[A-Z]/.test(w)).map(w => w[0]).slice(0, 2).join('')
}
useSeoPage({
  title: p.title,
  description: p.description,
  path: '/people',
  jsonLd: collectionPageJsonLd({
    name: 'People',
    description: p.description,
    url: '/people',
    items: list.value.map(x => ({ name: x.name, url: `/people/${x.slug}`, description: x.description || x.lede })),
  }),
})
</script>

<template>
  <div>
    <p class="section__label plate--subtitle">{{ p.label }}</p>
    <h1 class="section__title">{{ p.h1 }}</h1>
    <p class="script page-motto">{{ p.motto }}</p>
    <p class="prose">{{ p.intro }}</p>
    <ul class="people-grid">
      <li v-for="person in list" :key="person.slug">
        <a class="people-card" :href="`/people/${person.slug}`">
          <NuxtImg format="webp" v-if="person.portrait" class="people-card__img" :src="person.portrait" :alt="person.portraitAlt || ''" width="480" sizes="xs:90vw sm:480px md:256px" />
          <span v-else class="people-card__img people-card__img--empty" aria-hidden="true">{{ initials(person.name) }}</span>
          <span class="people-card__role">{{ person.role }}</span>
          <h2 class="people-card__name">{{ person.name }}</h2>
          <p class="people-card__lede">{{ person.lede }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>
