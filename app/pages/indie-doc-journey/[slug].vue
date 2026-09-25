<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug)
const { data: post } = await useAsyncData(`post-${slug}`, () => queryCollection('blog').path(`/indie-doc-journey/${slug}`).first())
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const title = displayTitle((post.value as any).title)
const description = String((post.value as any).description || title).trim()
const path = `/indie-doc-journey/${slug}`
useSeoPage({ title, description, path, ogType: 'article', jsonLd: blogPostingJsonLd({ title, description, url: path }) })
</script>

<template>
  <article v-if="post" class="prose">
    <p class="section__label">
      <a href="/indie-doc-journey" style="text-decoration: none;">← Journey</a>
    </p>
    <ContentRenderer :value="post" />
  </article>
</template>
