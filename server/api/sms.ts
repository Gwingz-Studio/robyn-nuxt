/** SMS opt-in intake: no SMS provider yet, so intake is email-only via FORMS_MAIL. */
export default defineEventHandler(async (event) => {
  if (event.method === 'OPTIONS') return corsPreflight()
  if (event.method !== 'POST') return formJson(405, { ok: false, error: 'Method not allowed' })

  let phone = ''
  const req = toWebRequest(event)
  const ctype = req.headers.get('content-type') || ''
  try {
    if (ctype.includes('application/json')) {
      const body: any = await req.json()
      phone = String(body.phone || '').trim()
    } else {
      const form = await req.formData()
      phone = String(form.get('phone') || '').trim()
    }
  } catch {
    return formJson(400, { ok: false, error: 'Could not read phone number' })
  }
  const digits = phone.replace(/[^\d+]/g, '')
  if (digits.replace(/\D/g, '').length < 10) {
    return formJson(400, { ok: false, error: 'Enter a valid phone number.', field: 'phone' })
  }
  const text = [
    'New SMS screening-list opt-in from golden-wings-robyn.com',
    '',
    `Phone: ${phone}`,
    '',
    'No SMS provider is connected yet, so this email is the only record. Nothing else was stored.',
    '',
    'Sent by the Gwingz Studios site forms.',
  ].join('\n')
  const result = await sendFormMail(event, { fromName: 'Golden Wings Screenings', subject: `SMS opt-in: ${phone}`, text })
  if (!result.ok) {
    return formJson(502, { ok: false, error: 'We could not save your number right now. Please try again in a few minutes or email info@golden-wings-robyn.com.', code: result.error })
  }
  return formJson(200, { ok: true, via: 'email-forward', smsProvider: null })
})
