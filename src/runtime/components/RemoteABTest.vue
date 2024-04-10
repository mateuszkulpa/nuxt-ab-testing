<script setup lang="ts" generic="TVariantKey extends string, TVariantValue extends JSONValue">
import type { JSONValue } from '../types'
import { COOKIE_PERSISTENCE_KEY } from '../utils/constants'
import { useFetch, useSlots, useCookie, useState } from '#imports'
import { nanoid } from 'nanoid'

const props = defineProps<{
  id: string
}>()

// NOTE: `useState` is required to generate a same key across multiple components
const persistenceKey = useState(COOKIE_PERSISTENCE_KEY, () => nanoid())
const cookie = useCookie(COOKIE_PERSISTENCE_KEY, {
  default() {
    return persistenceKey.value
  },
})

const { data } = await useFetch(`/_ab-testing/resolve-variant`, {
  query: { id: props.id },
  headers: {
    cookie: `${COOKIE_PERSISTENCE_KEY}=${cookie.value}`,
  },
})

const slots = useSlots()
if (!(data.value.result.id in slots)) {
  console.warn(`nuxt-ab-testing: Missing slot "${data.value.result.id}" for ${props.id} A/B test`)
}
</script>

<template>
  <template v-if="data.enabled">
    <slot :name="data.result.id" v-bind="data.result" />
  </template>
</template>
