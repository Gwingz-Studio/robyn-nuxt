<script setup lang="ts">
// :practical-faq renders the FAQ list from the dispatch frontmatter (same data feeds FAQPage JSON-LD)
const page = inject<any>('dispatch-page', null)
</script>

<template>
  <div class="practical-faq">
    <p v-if="page?.faqIntro">{{ page.faqIntro }}</p>
    <template v-for="faq in page?.faqs || []" :key="faq.question">
      <h3>{{ faq.question }}</h3>
      <p>{{ faq.answer }}</p>
    </template>
  </div>
</template>
