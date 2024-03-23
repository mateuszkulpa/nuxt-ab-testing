import { describe, expect, test } from 'vitest'
import { useABTest } from '~/src/runtime/composables/useABTest'
import { resolveABTestVariant } from '~/src/runtime/core/variants'

describe('useABTest', () => {
  const testCases = [
    { randomValue: 0.01, expected: { id: 'a', value: 'a' } },
    { randomValue: 0.3, expected: { id: 'a', value: 'a' } },
    { randomValue: 0.5, expected: { id: 'b', value: 'b' } },
    { randomValue: 0.51, expected: { id: 'b', value: 'b' } },
    { randomValue: 0.7, expected: { id: 'b', value: 'b' } },
    { randomValue: 0.99, expected: { id: 'b', value: 'b' } },
  ]

  test.each(testCases)(
    'picks random variant for random value $randomValue',
    ({ randomValue, expected }) => {
      const mockMath = Object.create(global.Math)
      mockMath.random = () => randomValue
      global.Math = mockMath

      const selectedVariant = resolveABTestVariant({
        id: 'test-id',
        variants: [
          { id: 'a', value: 'a' },
          { id: 'b', value: 'b' },
        ],
      })

      expect(selectedVariant.enabled).toBe(true)
      expect(selectedVariant.result).toEqual(expected)
    }
  )

  test('returns default variant when ab test is not enabled', () => {
    const result = useABTest({
      id: 'test-id',
      variants: [
        { id: 'a', value: 'a' },
        { id: 'b', value: 'b' },
      ],
      enabled: false,
      default: 'a',
    })

    expect(result).toEqual({ enabled: false, result: { id: 'a', value: 'a' } })
  })

  test('returns no result when default value is not defined', () => {
    const result = useABTest({
      id: 'test-id',
      variants: [
        { id: 'a', value: 'a' },
        { id: 'b', value: 'b' },
      ],
      enabled: false,
    })

    expect(result).toEqual({ enabled: false, result: undefined })
  })
})
