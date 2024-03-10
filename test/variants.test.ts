import { describe, expect, test } from 'vitest'
import { pickRandomVariant } from '~/src/runtime/core/variants'

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

      const selectedVariant = pickRandomVariant({
        id: 'test-id',
        variants: [
          { id: 'a', value: 'a' },
          { id: 'b', value: 'b' },
        ],
      })
      expect(selectedVariant).toEqual(expected)
    }
  )
})
