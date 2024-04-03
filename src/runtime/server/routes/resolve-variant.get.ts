import {
  defineEventHandler,
  getValidatedQuery,
  createError,
  useRuntimeConfig,
  useStorage,
  parseCookies,
  setCookie,
} from '#imports'
import { resolveABTestVariant } from '../../core/variants'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

const querySchema = z.object({
  id: z.string(),
})

const STORAGE_BASE_KEY = 'ab-testing'
const COOKIE_PERSISTENCE_KEY = `nuxt-ab-testing`

export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()

  const queryParamsResult = await getValidatedQuery(event, body => querySchema.safeParse(body))
  if (!queryParamsResult.success) {
    throw createError({
      statusCode: 422,
      statusMessage: `incorrect query parameters`,
    })
  }

  const queryParams = queryParamsResult.data
  const abTest = runtimeConfig.abTesting.tests.find(test => test.id === queryParams.id)

  if (!abTest) {
    throw createError({
      statusCode: 404,
      statusMessage: `AB test with id ${queryParams.id} not found`,
    })
  }

  if (!runtimeConfig.public.abTesting.persistVariants) {
    return resolveABTestVariant(abTest)
  }

  const storage = useStorage(STORAGE_BASE_KEY)
  let persistenceKey = parseCookies(event)[COOKIE_PERSISTENCE_KEY]
  if (!persistenceKey) {
    persistenceKey = uuidv4()
    setCookie(event, COOKIE_PERSISTENCE_KEY, persistenceKey)
  }

  const persistedVariantKey = `${persistenceKey}-${abTest.id}`

  if (!(await storage.hasItem(persistedVariantKey))) {
    const selectedVariant = resolveABTestVariant(abTest)
    await storage.setItem(persistedVariantKey, selectedVariant)
    return selectedVariant
  }

  return await storage.getItem(persistedVariantKey)
})