<script setup lang="ts">
/** Screenings SMS opt-in card. Works without JS (plain POST to /api/sms); JS shows inline success/error. */
const c = await useSiteCopy('screenings-card')
const done = ref(false)
const error = ref('')
const phone = ref('')

async function onSubmit(e: Event) {
  const form = e.target as HTMLFormElement
  error.value = ''
  if (!phone.value.trim()) { error.value = 'Enter a phone number.'; return }
  try {
    const res = await fetch('/api/sms', { method: 'POST', body: new FormData(form) })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) { error.value = data.error || 'Something went wrong. Try again.'; return }
    done.value = true
  } catch {
    error.value = 'Network error. Try again.'
  }
}
</script>

<template>
  <aside class="dl-card screenings-card" aria-labelledby="screenings-card-title">
    <p class="section__label">{{ c.label }}</p>
    <h2 id="screenings-card-title" class="dl-card__title">{{ c.heading }}</h2>
    <p class="dl-card__note">{{ c.note }}</p>

    <form v-show="!done" id="screenings-form" class="screenings-card__form" action="/api/sms" method="post" novalidate @submit.prevent="onSubmit">
      <label class="screenings-card__label" for="screenings-phone">{{ c.phoneLabel }}</label>
      <input id="screenings-phone" v-model="phone" class="screenings-card__input" name="phone" type="tel" autocomplete="tel" inputmode="tel" required :placeholder="c.placeholder">
      <p v-show="error" id="screenings-error" class="screenings-card__error">{{ error }}</p>
      <button class="btn btn--primary" type="submit">{{ c.submit }}</button>
      <p class="screenings-card__terms">
        {{ c.termsBefore }} <a href="/sms-opt-in">{{ c.termsLink }}</a>.
      </p>
    </form>

    <div v-show="done" id="screenings-success" class="screenings-card__success">
      <span class="badge">{{ c.successBadge }}</span>
      <p>{{ c.success }}</p>
    </div>
  </aside>
</template>
