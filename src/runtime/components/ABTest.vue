<script setup lang="ts" generic="TVariantValue extends JSONValue">
import { useABTest } from '../composables/useABTest'
import type { JSONValue, Variant } from '../types'
import { useSlots } from '#imports'

const props = defineProps<{
  id: string
  variants: Variant<TVariantValue>[]
}>()

const { enabled, result } = useABTest<TVariantValue>({
  id: props.id,
  variants: props.variants,
})

const slots = useSlots()

props.variants.forEach(variant => {
  if (!(variant.id in slots)) {
    console.warn(`nuxt-ab-testing: Missing slot "${variant.id}" for ${props.id} A/B test`)
  }
})
</script>

<template>
  <template v-if="enabled">
    <template v-for="variant in variants" :key="variant.id">
      <template v-if="result.id === variant.id">
        <slot :name="variant.id" v-bind="variant" />
      </template>
    </template>
  </template>
</template>
