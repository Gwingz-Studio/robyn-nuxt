<script setup lang="ts">
const props = defineProps<{ chrome: any }>()
const route = useRoute()
const pathname = computed(() => route.path.replace(/\/$/, '') || '/')
function isCurrent(href: string) {
  const p = pathname.value
  if (href === '/') return p === '/'
  if (href === '/indie-doc-journey') {
    return p === href || p.startsWith(href + '/') || p === '/special-dispatch' || p.startsWith('/special-dispatch/')
  }
  return p === href || p.startsWith(href + '/')
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="/">
        <span class="brand__primary">{{ props.chrome.brand }}</span>
        <span class="brand__sub">{{ props.chrome.brandSub }}</span>
      </a>
      <nav aria-label="Primary">
        <ul class="nav">
          <li v-for="item in props.chrome.nav" :key="item.href">
            <a :href="item.href" :aria-current="isCurrent(item.href) ? 'page' : undefined">{{ item.label }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
