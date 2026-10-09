/**
 * Storyblok Visual Editor signature check, shared by the /api/storyblok/* endpoints.
 * _storyblok_tk: sha1(space_id:preview_token:timestamp), at most one hour old.
 * Valid signature = the request comes from the Visual Editor and may see draft content.
 */
import { createHash } from 'node:crypto'

export const SB_SPACE_ID = '295612352463495'

export function validEditorToken(q: Record<string, any>, accessToken: string): boolean {
  const spaceId = String(q['_storyblok_tk[space_id]'] ?? q._storyblok_tk?.space_id ?? '')
  const ts = String(q['_storyblok_tk[timestamp]'] ?? q._storyblok_tk?.timestamp ?? '')
  const token = String(q['_storyblok_tk[token]'] ?? q._storyblok_tk?.token ?? '')
  if (spaceId !== SB_SPACE_ID || !/^\d+$/.test(ts) || !token) return false
  if (Number(ts) < Math.floor(Date.now() / 1000) - 3600) return false
  const expected = createHash('sha1').update(`${spaceId}:${accessToken}:${ts}`).digest('hex')
  return expected === token
}
