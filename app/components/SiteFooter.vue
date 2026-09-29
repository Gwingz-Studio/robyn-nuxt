<script setup lang="ts">
defineProps<{ chrome: any }>()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <p class="site-footer__title">{{ chrome.footerTitle }}</p>
        <p class="site-footer__sub">{{ chrome.footerSub }}</p>
        <p class="site-footer__copy">{{ chrome.copyright }}</p>
      </div>
      <nav aria-label="Contact and legal" class="site-footer__nav">
        <a v-for="item in chrome.footerNav" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>
    </div>
    <div><a href="https://directory.calrainbowchamber.org/los-angeles/arts-entertainment/caleb-stewart?from=badge"  title="Find me on California LGBTQ Chamber of Commerce" target="_blank"><img src="https://directory.calrainbowchamber.org/images/memberbadge.png" style="border: none;"/></a></div>
  </footer>
</template>
