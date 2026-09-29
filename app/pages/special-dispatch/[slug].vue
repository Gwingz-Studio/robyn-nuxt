<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
const { data: page } = await useAsyncData(`dispatch-${slug}`, () => queryCollection('dispatch').path(`/special-dispatch/${slug}`).first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const p = computed(() => page.value as any)
provide('dispatch-page', p.value)
const path = `/special-dispatch/${slug}`
useSeoPage({
  title: p.value.title,
  fullTitle: p.value.fullTitle,
  description: p.value.description,
  path,
  ogImage: p.value.ogImage,
  ogType: 'article',
  jsonLd: [
    blogPostingJsonLd({ title: p.value.h1, description: p.value.description, url: path, image: p.value.ogImage }),
    faqPageJsonLd(p.value.faqs || []),
  ],
})
</script>

<template>
  <article v-if="page" class="prose">
    <p class="section__label">
      <a href="/special-dispatch" style="text-decoration: none;">← Special Dispatch</a>
      {{ ' · ' }}
      <a href="/indie-doc-journey" style="text-decoration: none;">Journey</a>
    </p>
    <p class="section__label plate--subtitle">{{ p.eyebrow }}</p>
    <h1>{{ p.h1 }}</h1>
    <figure style="margin: 1.25rem 0 1.75rem;">
      <NuxtImg format="webp" :provider="mediaProvider(p.ogImage)" :src="p.ogImage" :alt="p.featuredAlt" width="1024" height="768" densities="x1" loading="eager" decoding="async" style="width: 100%; height: auto; display: block;" />
    </figure>
    <ContentRenderer :value="page" />
  </article>
</template>
