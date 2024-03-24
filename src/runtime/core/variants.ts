import type { ABTest, ABTestResult, JSONValue } from '~/src/runtime/types'

export function resolveABTestVariant<TVariantValue extends JSONValue>(
  abTest: ABTest<string, TVariantValue>
): ABTestResult<TVariantValue> {
  if (abTest.variants.every(variant => variant.weight === undefined)) {
    return {
      enabled: true,
      result: abTest.variants[Math.floor(Math.random() * abTest.variants.length)],
    }
  }

  if (abTest.variants.some(variant => variant.weight === undefined)) {
    const variantsWithoutWeight = abTest.variants
      .filter(variant => variant.weight === undefined)
      .map(variant => variant.id)

    throw new Error(
      `Some variants have no weight defined. Check variants with ids: ${variantsWithoutWeight.join(', ')}`
    )
  }

  const randomNumber = Math.random()
  let cumulativeWeight = 0

  for (const variant of abTest.variants) {
    cumulativeWeight += variant.weight!
    if (randomNumber <= cumulativeWeight) {
      return { enabled: true, result: variant }
    }
  }
  // TODO: normalize weights and show warning if sum of weights is not 1
  throw new Error('Could not pick a random variant')
}
