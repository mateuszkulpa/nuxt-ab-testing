<script setup lang="ts" generic="TValue extends JSONValue">
import type { JSONValue, Variant } from '../types/variant'
import { useCookie, useState } from '#imports'

const props = defineProps<{
  id: string
  variants: Variant<TValue>[]
}>()

const storageId = `ab-test:${props.id}`

function pickRandomVariant() {
  return props.variants[Math.floor(Math.random() * props.variants.length)]
}

function getRandomVariant() {
  const runtimeConfig = useRuntimeConfig()
  const { persistVariants } = runtimeConfig.public.abTesting

  if (!persistVariants) {
    const randomVariant = useState(storageId, () => pickRandomVariant())
    return randomVariant
  } else {
    const cookieValue = useCookie<Variant<TValue>>(storageId)
    if (cookieValue.value) {
      return cookieValue
    }

    const randomVariant = pickRandomVariant()
    cookieValue.value = randomVariant
    return randomVariant
  }
}

const randomVariant = getRandomVariant()
</script>

<template>
  <template v-for="variant in variants" :key="variant.id">
    <template v-if="randomVariant.id === variant.id">
      <slot :name="variant.id" v-bind="variant" />
    </template>
  </template>
</template>
