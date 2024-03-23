import { useCookie, useState, useRuntimeConfig } from '#imports'
import type { ABTest, ABTestResult, JSONValue } from '../types'
import { resolveABTestVariant } from '../core/variants'

const STORAGE_KEY_PREFIX = 'ab-test'

export function useABTest<TVariantValue extends JSONValue>(
  abTest: ABTest<TVariantValue>
): ABTestResult<TVariantValue> {
  const storageId = `${STORAGE_KEY_PREFIX}:${abTest.id}`

  if (abTest.enabled === false) {
    const defaultVariant = abTest.variants.find(({ id }) => id === abTest.default)
    return { enabled: false, result: defaultVariant }
  }

  const runtimeConfig = useRuntimeConfig()
  const { persistVariants, variantMaxAge } = runtimeConfig.public.abTesting

  if (!persistVariants) {
    const randomVariant = useState(storageId, () => resolveABTestVariant(abTest))
    return randomVariant.value
  } else {
    const cookieValue = useCookie<ABTestResult<TVariantValue>>(storageId, {
      maxAge: variantMaxAge,
    })
    if (cookieValue.value) {
      return cookieValue.value
    }

    cookieValue.value = resolveABTestVariant(abTest)
    return cookieValue.value
  }
}
