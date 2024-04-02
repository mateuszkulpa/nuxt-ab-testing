import { defineEventHandler, getValidatedQuery, createError, useRuntimeConfig } from '#imports'
import { resolveABTestVariant } from '../../core/variants'

import { z } from 'zod'

const querySchema = z.object({
  id: z.string(),
})

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

  return resolveABTestVariant(abTest)
})
