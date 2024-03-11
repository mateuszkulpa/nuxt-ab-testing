import { URL, fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('auto-generated components', async () => {
  await setup({
    server: true,
    rootDir: fileURLToPath(new URL('./fixtures/components', import.meta.url)),
  })

  it('generates components based on config', async () => {
    const html = await $fetch('/')
    expect(html).toEqual(expect.stringMatching(/variant: (a|b)/))
  })
})
