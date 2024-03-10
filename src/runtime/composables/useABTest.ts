import { useCookie, useState, useRuntimeConfig } from '#imports'
import type { ABTest, JSONValue, Variant } from '../types'
import { pickRandomVariant } from '../core/variants'

export function useABTest<TVariantValue extends JSONValue>(
  abTest: ABTest<TVariantValue>
): Variant<TVariantValue> {
  const storageId = `ab-test:${abTest.id}`

  const runtimeConfig = useRuntimeConfig()
  const { persistVariants } = runtimeConfig.public.abTesting

  if (!persistVariants) {
    const randomVariant = useState(storageId, () => pickRandomVariant(abTest))
    return randomVariant.value
  } else {
    const cookieValue = useCookie<Variant<TVariantValue>>(storageId)
    if (cookieValue.value) {
      return cookieValue.value
    }

    cookieValue.value = pickRandomVariant(abTest)
    return cookieValue.value
  }
}
