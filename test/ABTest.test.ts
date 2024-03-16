// @vitest-environment nuxt
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ABTest from '~/src/runtime/components/ABTest.vue'

vi.mock('~/src/runtime/composables/useABTest', () => ({
  useABTest: vi.fn(() => ({ id: 'variant-a', value: 'Variant A' })),
}))

describe('ABTest.vue', async () => {
  it('renders the correct variant slot', async () => {
    const wrapper = mount(ABTest, {
      props: {
        id: 'header',
        variants: [
          { id: 'variant-a', value: 'Variant A' },
          { id: 'variant-b', value: 'Variant B' },
        ],
      },
      slots: {
        'variant-a': { template: '<div>Slot A</div>' },
        'variant-b': { template: '<div>Slot B</div>' },
      },
    })

    expect(wrapper.html()).toContain('Slot A')
    expect(wrapper.html()).not.toContain('Slot B')
  })

  it('shows warning when required slot is not defined', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    mount(ABTest, {
      props: {
        id: 'header',
        variants: [
          { id: 'variant-a', value: 'Variant A' },
          { id: 'variant-b', value: 'Variant B' },
        ],
      },
      slots: {
        'variant-a': { template: '<div>Slot A</div>' },
      },
    })

    expect(warnSpy).toHaveBeenCalledWith(
      'nuxt-ab-testing: Missing slot "variant-b" for header A/B test'
    )
  })
})
