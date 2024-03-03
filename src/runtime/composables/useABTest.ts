import { useCookie, useState } from '#imports'
import type { ABTest, JSONValue, Variant } from '../types'

export function useABTest<TVariantValue extends JSONValue>(abTest: ABTest<TVariantValue>) {
  const storageId = `ab-test:${abTest.id}`

  function pickRandomVariant() {
    return abTest.variants[Math.floor(Math.random() * abTest.variants.length)]
  }

  const runtimeConfig = useRuntimeConfig()
  const { persistVariants } = runtimeConfig.public.abTesting

  if (!persistVariants) {
    const randomVariant = useState(storageId, () => pickRandomVariant())
    return randomVariant.value
  } else {
    const cookieValue = useCookie<Variant<TVariantValue>>(storageId)
    if (cookieValue.value) {
      return cookieValue.value
    }

    cookieValue.value = pickRandomVariant()
    return cookieValue.value
  }
}
