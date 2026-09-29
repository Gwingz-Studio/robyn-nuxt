<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
const { data: person } = await useAsyncData(`person-${slug}`, () => queryCollection('people').path(`/people/${slug}`).first())
if (!person.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const p = computed(() => ({ ...((person.value as any).meta || {}), ...(person.value as any) }))
const img = useImage()
const portraitUrl = p.value.portrait ? img(p.value.portrait, { width: 720, format: 'webp' }, { provider: mediaProvider(p.value.portrait) }) : undefined
useSeoPage({
  title: p.value.name,
  description: p.value.description,
  path: `/people/${slug}`,
  jsonLd: personJsonLd({ name: p.value.name, description: p.value.description, jobTitle: p.value.role, url: `/people/${slug}`, image: portraitUrl }),
})
</script>

<template>
  <article v-if="person">
    <header :class="['person__header', { 'person__header--with-portrait': p.portrait }]">
      <div>
        <p class="section__label plate--subtitle"><a href="/people">People</a> / {{ p.role }}</p>
        <h1 class="section__title">{{ p.name }}</h1>
        <p v-if="p.years" class="person__years mono">{{ p.years }}</p>
        <p class="person__lede">{{ p.lede }}</p>
      </div>
      <NuxtImg format="webp" v-if="p.portrait" class="person__portrait" :provider="mediaProvider(p.portrait)" :src="p.portrait" :alt="p.portraitAlt || ''" width="720" sizes="xs:90vw sm:720px md:320px" loading="eager" />
    </header>
    <div class="prose">
      <ContentRenderer :value="person" />
    </div>
    <div class="hero__ctas person__ctas">
      <a class="btn btn--ghost" href="/people">All people</a>
    </div>
  </article>
</template>
