import { URL, fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch, url } from '@nuxt/test-utils'

describe('auto-generated composables', async () => {
  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('./fixtures/composables', import.meta.url)),
  })

  it('generates composable based on config', async () => {
    const html = await $fetch('/')
    expect(html).toEqual(expect.stringMatching(/variant: (a|b)/))
  })

  it('persists selected variant in cookie', async () => {
    const { headers } = await fetch(url('/'))

    const cookieHeader = headers.get('set-cookie')
    expect(cookieHeader).toContain('ab-test:header')
    expect(cookieHeader).toContain('Max-Age=60')
  })
})
