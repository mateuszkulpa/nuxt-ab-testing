import { describe, expect, it } from 'vitest'
import { fetch, setup } from '@nuxt/test-utils/e2e'
import { fileURLToPath, URL } from 'node:url'
import { nanoid } from 'nanoid'

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

  it('does not return persistence key in cookie when it is passed', async () => {
    const persistenceKey = nanoid()
    const response = await fetch('/_ab-testing/resolve-variant', {
      headers: {
        cookie: `nuxt-ab-testing=${persistenceKey}`,
      },
    })

    const responseCookie = response.headers.get('set-cookie')
    expect(responseCookie).toBe(null)
  })

  it('returns unprocessable entity error when no id passed', async () => {
    const response = await fetch('/_ab-testing/resolve-variant')

    expect(response.status).toBe(422)
  })
})
