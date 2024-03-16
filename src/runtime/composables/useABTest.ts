import { useCookie, useState, useRuntimeConfig } from '#imports'
import type { ABTest, ABTestResult, JSONValue } from '../types'
import { resolveABTestVariant } from '../core/variants'

export function useABTest<TVariantValue extends JSONValue>(
  abTest: ABTest<TVariantValue>
): ABTestResult<TVariantValue> {
  const storageId = `ab-test:${abTest.id}`

  const runtimeConfig = useRuntimeConfig()
  const { persistVariants } = runtimeConfig.public.abTesting

  if (!persistVariants) {
    const randomVariant = useState(storageId, () => resolveABTestVariant(abTest))
    return randomVariant.value
  } else {
    const cookieValue = useCookie<ABTestResult<TVariantValue>>(storageId)
    if (cookieValue.value) {
      return cookieValue.value
    }

    cookieValue.value = resolveABTestVariant(abTest)
    return cookieValue.value
  }
}
