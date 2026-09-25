/**
 * Form mail via Cloudflare Email Routing (Workers send_email binding FORMS_MAIL).
 * Sender forms@gwingz.com (gwingz.com has Email Routing); destination is the verified address.
 * On the preview Worker (FORM_ENV=preview) every subject gets a "[PREVIEW] " prefix.
 */
import type { H3Event } from 'h3'

export const MAIL_FROM = 'forms@gwingz.com'
export const MAIL_TO = 'caleb.mills.stewart@gmail.com'

const oneLine = (v: unknown) => String(v || '').replace(/[\r\n]+/g, ' ').trim()
function b64utf8(str: string) {
  const bytes = new TextEncoder().encode(str)
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!)
  return btoa(bin)
}
const encodeWord = (str: string) => { const s = oneLine(str); return /^[\x20-\x7E]*$/.test(s) ? s : `=?UTF-8?B?${b64utf8(s)}?=` }
function mailbox(name: string | undefined, addr: string) {
  const n = oneLine(name).replace(/["\\]/g, '')
  return n ? `"${encodeWord(n)}" <${oneLine(addr)}>` : `<${oneLine(addr)}>`
}
export const isEmail = (v: unknown) => /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(String(v || ''))

export function cfEnv(event: H3Event): Record<string, any> {
  return (event.context as any).cloudflare?.env || {}
}

export async function sendFormMail(event: H3Event, opts: { fromName?: string, subject: string, text: string, replyTo?: string, replyToName?: string }) {
  const env = cfEnv(event)
  const binding = env.FORMS_MAIL
  if (!binding || typeof binding.send !== 'function') {
    return { ok: false as const, error: 'mail_binding_missing', detail: 'FORMS_MAIL send_email binding is not configured.' }
  }
  const prefix = env.FORM_ENV === 'production' ? '' : '[PREVIEW] '
  const subject = prefix + opts.subject
  const messageId = `<${crypto.randomUUID()}@gwingz.com>`
  const body = b64utf8(String(opts.text || '')).replace(/.{1,76}/g, '$&\r\n')
  const headers = [
    `From: ${mailbox(opts.fromName || 'Golden Wings Forms', MAIL_FROM)}`,
    `To: ${mailbox('Caleb', MAIL_TO)}`,
    `Subject: ${encodeWord(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: ${messageId}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    'X-Golden-Wings-Form: golden-wings-robyn.com',
  ]
  if (opts.replyTo && isEmail(opts.replyTo)) headers.push(`Reply-To: ${mailbox(opts.replyToName, opts.replyTo)}`)
  const raw = headers.join('\r\n') + '\r\n\r\n' + body
  try {
    // Dynamic import: `cloudflare:email` only exists on Workers (not in the Node prerender step).
    const { EmailMessage } = await import('cloudflare:email' as string)
    await binding.send(new EmailMessage(MAIL_FROM, MAIL_TO, raw))
    console.log(JSON.stringify({ event: 'form_mail_sent', subject: oneLine(subject), messageId }))
    return { ok: true as const, messageId }
  } catch (err: any) {
    const detail = String(err?.message ?? err).slice(0, 300)
    console.error(JSON.stringify({ event: 'form_mail_failed', subject: oneLine(subject), detail }))
    return { ok: false as const, error: 'mail_send_failed', detail }
  }
}

export function formJson(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } })
}

export function corsPreflight() {
  return new Response(null, {
    status: 204,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' },
  })
}
