import type { ABTest, JSONValue, Variant } from '~/src/runtime/types'

export function pickRandomVariant<TVariantValue extends JSONValue>(
  abTest: ABTest<TVariantValue>
): Variant<TVariantValue> {
  if (abTest.enabled === false) {
    const defaultVariant = abTest.variants.find(({ id }) => id === abTest.default)
    if (defaultVariant === undefined) {
      throw new Error('No default variant found')
    }
    return defaultVariant
  }

  if (abTest.variants.every(variant => variant.weight === undefined)) {
    return abTest.variants[Math.floor(Math.random() * abTest.variants.length)]
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
      return variant
    }
  }
  // TODO: normalize weights and show warning if sum of weights is not 1
  throw new Error('Could not pick a random variant')
}
