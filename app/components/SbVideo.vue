<script setup lang="ts">
/**
 * One video field for editors: a Cloudflare Stream video ID (32 hex characters) or a video URL
 * (.mp4/.webm, or an HLS .m3u8 playlist, played with hls.js where the browser has no native HLS).
 * `background` = muted autoplay loop with no controls, as a native <video> that fills its box (object-fit: cover).
 *   A Stream ID in background mode plays its HLS manifest natively (no iframe).
 * `autoplay` = muted autoplay with controls visible (browsers only autoplay muted video). A Stream
 *   autoplay embed is only loaded when it comes near the viewport, then plays muted as before; the
 *   empty frame keeps the same box until then, so nothing on the page moves.
 */
const props = withDefaults(defineProps<{ video?: string, poster?: string, background?: boolean, autoplay?: boolean, title?: string }>(), {
  video: '', poster: '', background: false, autoplay: false, title: 'Golden Wings video',
})
// Stream ID, Stream URL or pasted embed code -> bare ID; other http(s) URLs kept; anything else ignored.
const v = computed(() => videoSource(props.video))
const isStream = computed(() => /^[a-f0-9]{32}$/i.test(v.value))
const useIframe = computed(() => isStream.value && !props.background)
const hlsUrl = computed(() => {
  if (isStream.value && props.background) return `https://${STREAM_CUSTOMER}.cloudflarestream.com/${v.value}/manifest/video.m3u8`
  return /\.m3u8(\?|$)/i.test(v.value) ? v.value : ''
})
const streamSrc = computed(() => {
  const q = new URLSearchParams()
  if (props.autoplay) { q.set('autoplay', 'true'); q.set('muted', 'true'); q.set('preload', 'true'); q.set('loop', 'true') }
  else { q.set('preload', 'true'); q.set('loop', 'true') }
  if (props.poster) q.set('poster', props.poster.startsWith('http') ? props.poster : `https://golden-wings-robyn.com${props.poster}`)
  return `https://${STREAM_CUSTOMER}.cloudflarestream.com/${v.value}/iframe?${q.toString()}`
})
const el = ref<HTMLVideoElement | null>(null)
const root = ref<HTMLElement | null>(null)
// Autoplay Stream iframes wait until they are within ~400px of the viewport (saves the player
// script on load); click-to-play iframes keep the browser's own lazy loading.
const near = ref(false)
const iframeSrc = computed(() => (!props.autoplay || near.value ? streamSrc.value : undefined))
let io: IntersectionObserver | null = null
function watchNear() {
  if (io || !useIframe.value || !props.autoplay || near.value || !root.value) return
  if (typeof IntersectionObserver === 'undefined') { near.value = true; return }
  io = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) { near.value = true; io?.disconnect(); io = null }
  }, { rootMargin: '400px 0px' })
  io.observe(root.value)
}
let hls: any = null
function kick(video: HTMLVideoElement) {
  if (!props.background && !props.autoplay) return
  video.muted = true
  video.play()?.catch(() => {})
}
async function attach() {
  const video = el.value
  if (!video) return
  const src = hlsUrl.value
  if (!src) { hls?.destroy(); hls = null; kick(video); return }
  if (video.canPlayType('application/vnd.apple.mpegurl')) { video.src = src; kick(video); return }
  const { default: Hls } = await import('hls.js')
  if (!Hls.isSupported()) return
  hls?.destroy()
  hls = new Hls({ capLevelToPlayerSize: !props.background })
  hls.loadSource(src)
  hls.attachMedia(video)
  hls.on(Hls.Events.MANIFEST_PARSED, () => kick(video))
}
onMounted(() => { attach(); watchNear() })
watch(v, () => nextTick(attach))
watch([useIframe, () => props.autoplay], () => nextTick(watchNear))
onBeforeUnmount(() => { hls?.destroy(); io?.disconnect() })
</script>

<template>
  <div v-if="v" ref="root" :class="['sb-video', { 'sb-video--bg': background }]">
    <iframe
      v-if="useIframe"
      :src="iframeSrc"
      :title="title"
      :loading="autoplay ? undefined : 'lazy'"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen
    />
    <video
      v-else
      ref="el"
      :src="hlsUrl ? undefined : v"
      :poster="poster || undefined"
      :autoplay="background || autoplay"
      :muted="background || autoplay"
      :loop="background || autoplay"
      :controls="!background"
      playsinline
      :preload="background ? 'auto' : 'metadata'"
      :tabindex="background ? -1 : undefined"
      :aria-hidden="background ? 'true' : undefined"
      :disablepictureinpicture="background || undefined"
      :title="background ? undefined : title"
    />
  </div>
</template>
