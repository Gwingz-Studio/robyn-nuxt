<script setup lang="ts">
/** Crew story intake. Same field names as the Astro form; no-JS fallback posts to /api/crew. */
const props = defineProps<{ copy: any }>()
const done = ref(false)
const error = ref('')
const consent = ref(false)

async function onSubmit(e: Event) {
  const form = e.target as HTMLFormElement
  error.value = ''
  if (!consent.value) { error.value = 'Please check the consent box before sending.'; return }
  try {
    const res = await fetch('/api/crew', { method: 'POST', body: new FormData(form) })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) { error.value = data.error || 'Something went wrong. Try again.'; return }
    done.value = true
  } catch {
    error.value = 'Network error. Try again.'
  }
}
</script>

<template>
  <div class="crew-call__plate">
    <form v-show="!done" id="crew-form" class="crew-form" action="/api/crew" method="post" enctype="multipart/form-data" novalidate @submit.prevent="onSubmit">
      <div class="crew-form__field">
        <label class="crew-form__label" for="crew-name">Name</label>
        <input id="crew-name" class="crew-form__input" name="name" type="text" autocomplete="name" required>
      </div>
      <div class="crew-form__field">
        <label class="crew-form__label" for="crew-email">Email</label>
        <input id="crew-email" class="crew-form__input" name="email" type="email" autocomplete="email" required>
      </div>
      <div class="crew-form__field">
        <label class="crew-form__label" for="crew-airline-years">Airline &amp; years</label>
        <input id="crew-airline-years" class="crew-form__input" name="airline_years" type="text" :placeholder="props.copy.airlinePlaceholder" required>
      </div>
      <div class="crew-form__field">
        <label class="crew-form__label" for="crew-story">Your story</label>
        <textarea id="crew-story" class="crew-form__textarea" name="story" rows="5" :placeholder="props.copy.storyPlaceholder" required />
      </div>
      <label class="crew-form__consent">
        <input id="crew-consent" v-model="consent" name="consent" type="checkbox" value="yes" required>
        <span>{{ props.copy.consent }}</span>
      </label>
      <p v-show="error" id="crew-error" class="crew-form__error">{{ error }}</p>
      <button class="btn btn--primary" type="submit">{{ props.copy.submit }}</button>
    </form>
    <p v-show="!done" class="crew-form__photo-note">{{ props.copy.photoNote }}</p>

    <div v-show="done" id="crew-success" class="crew-form__success">
      <span class="badge">{{ props.copy.successBadge }}</span>
      <p>{{ props.copy.success }}</p>
    </div>
  </div>
</template>
