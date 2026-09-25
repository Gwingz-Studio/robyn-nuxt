<script setup lang="ts">
// MDC wrapper so markdown can embed a Stream player: ::stream-video{video="trailer" title="..." poster="/..."}
defineProps<{ video: string, title?: string, poster?: string }>()
</script>

<template>
  <figure class="film-trailer">
    <StreamPlayer :video="video" :title="title" :poster="poster" />
  </figure>
</template>
