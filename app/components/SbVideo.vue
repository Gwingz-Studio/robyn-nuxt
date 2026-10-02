<script setup lang="ts">
/**
 * One video field for editors: a Cloudflare Stream video ID (32 hex characters) or a video URL
 * (.mp4/.webm, or an HLS .m3u8 playlist, played with hls.js where the browser has no native HLS).
 * `background` = muted autoplay loop with no controls.
 */
const props = withDefaults(defineProps<{ video?: string, poster?: string, background?: boolean, title?: string }>(), {
  video: '', poster: '', background: false, title: 'Golden Wings video',
})
const v = computed(() => String(props.video || '').trim())
const isStream = computed(() => /^[a-f0-9]{32}$/i.test(v.value))
const isHls = computed(() => /\.m3u8(\?|$)/i.test(v.value))
const streamSrc = computed(() => {
  const q = new URLSearchParams()
  if (props.background) { q.set('autoplay', 'true'); q.set('muted', 'true'); q.set('loop', 'true'); q.set('controls', 'false') }
  else { q.set('preload', 'true'); q.set('loop', 'true') }
  if (props.poster) q.set('poster', props.poster.startsWith('http') ? props.poster : `https://golden-wings-robyn.com${props.poster}`)
  return `https://${STREAM_CUSTOMER}.cloudflarestream.com/${v.value}/iframe?${q.toString()}`
})
const el = ref<HTMLVideoElement | null>(null)
let hls: any = null
async function attach() {
  const video = el.value
  if (!video || !isHls.value) return
  if (video.canPlayType('application/vnd.apple.mpegurl')) { video.src = v.value; return }
  const { default: Hls } = await import('hls.js')
  if (!Hls.isSupported()) return
  hls?.destroy()
  hls = new Hls({ capLevelToPlayerSize: true })
  hls.loadSource(v.value)
  hls.attachMedia(video)
}
onMounted(attach)
watch(v, () => nextTick(attach))
onBeforeUnmount(() => hls?.destroy())
</script>

<template>
  <div v-if="v" :class="['sb-video', { 'sb-video--bg': background }]">
    <iframe
      v-if="isStream"
      :src="streamSrc"
      :title="title"
      loading="lazy"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen
      :tabindex="background ? -1 : undefined"
      :aria-hidden="background ? 'true' : undefined"
    />
    <video
      v-else
      ref="el"
      :src="isHls ? undefined : v"
      :poster="poster || undefined"
      :autoplay="background"
      :muted="background"
      :loop="background"
      :controls="!background"
      playsinline
      preload="metadata"
      :aria-hidden="background ? 'true' : undefined"
      :title="title"
    />
  </div>
</template>
