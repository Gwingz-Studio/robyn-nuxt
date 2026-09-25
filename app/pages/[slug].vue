<script setup lang="ts">
// Generic markdown pages from content/pages/*.md (legal, SMS opt-in, About, 8 campaign pages).
const route = useRoute()
const slug = String(route.params.slug)
const { data: page } = await useAsyncData(`page-${slug}`, () => queryCollection('pages').path(`/${slug}`).first())
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const p = computed(() => ({ ...((page.value as any).meta || {}), ...(page.value as any) }))
const path = `/${slug}`
const description = p.value.description || (p.value.layout === 'about' ? 'About Golden Wings, the documentary.' : '')
const jsonLd = p.value.layout === 'about'
  ? aboutPageJsonLd(description)
  : webPageJsonLd({ name: p.value.title, description: description || DEFAULT_DESCRIPTION, url: path })
useSeoPage({ title: p.value.title, description, path, jsonLd })
const bodyHasH1 = computed(() => JSON.stringify((page.value as any)?.body?.value || []).includes('["h1"'))
</script>

<template>
  <div v-if="page">
    <template v-if="p.layout === 'about'">
      <header>
        <h1 class="section__title">{{ p.title }}</h1>
        <p class="script page-motto">Find Your Wings</p>
      </header>
      <article class="prose prose--drop-lead-title">
        <ContentRenderer :value="page" />
      </article>
      <div class="hero__ctas" style="margin-top: 2.5rem;">
        <a class="btn btn--primary" href="/people">Meet the people</a>
        <a class="btn btn--ghost" href="/contact">Contact</a>
      </div>
    </template>

    <section v-else-if="p.layout === 'optin'" class="optin-box">
      <p v-if="p.label" class="section__label plate--subtitle">{{ p.label }}</p>
      <h1 class="section__title">{{ p.title }}</h1>
      <p v-if="p.motto" class="script page-motto">{{ p.motto }}</p>
      <div class="prose">
        <ContentRenderer :value="page" />
      </div>
      <div v-if="p.ctas?.length" class="hero__ctas" style="margin-top: 1.75rem;">
        <a v-for="(c, i) in p.ctas" :key="c.href" :class="['btn', i === 0 ? 'btn--primary' : 'btn--ghost']" :href="c.href">{{ c.text }}</a>
      </div>
    </section>

    <template v-else>
      <h1 v-if="!bodyHasH1" class="section__title">{{ p.title }}</h1>
      <article class="prose">
        <ContentRenderer :value="page" />
      </article>
    </template>
  </div>
</template>
