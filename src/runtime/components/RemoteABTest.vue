<script setup lang="ts" generic="TVariantKey extends string, TVariantValue extends JSONValue">
import type { JSONValue } from '../types'
import { COOKIE_PERSISTENCE_KEY } from '../utils/constants'
import { useFetch, useSlots, useRequestHeaders, useCookie } from '#imports'

const props = defineProps<{
  id: string
}>()

const headers = useRequestHeaders(['cookie'])
const cookie = useCookie(COOKIE_PERSISTENCE_KEY)

const { data } = await useFetch(`/_ab-testing/resolve-variant`, {
  query: { id: props.id },
  headers: headers,
  onResponse({ response }) {
    const key = response.headers.get(COOKIE_PERSISTENCE_KEY)
    if (import.meta.server && key) {
      cookie.value = key
    }
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
