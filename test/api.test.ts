import { describe, expect, it } from 'vitest'
import { fetch, setup } from '@nuxt/test-utils/e2e'
import { fileURLToPath, URL } from 'node:url'

describe('api', async () => {
  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('./fixtures/api', import.meta.url)),
  })

  it('returns variant and cookie', async () => {
    const response = await fetch('/_ab-testing/resolve-variant?id=header')

    const body = await response.json()
    const setCookieHeader = response.headers.get('set-cookie')

    expect(body.enabled).toBe(true)
    expect(body.result).toEqual({
      id: expect.stringMatching(/([ab])/),
      value: expect.stringMatching(/([ab])/),
    })
    expect(setCookieHeader).toContain('nuxt-ab-testing')
  })
})
