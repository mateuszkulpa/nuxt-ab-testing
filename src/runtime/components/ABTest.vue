<script setup lang="ts" generic="TVariantKey extends string, TVariantValue extends JSONValue">
import { useABTest } from '../composables/useABTest'
import type { JSONValue, Variant } from '../types'
import { useSlots } from '#imports'

const props = withDefaults(
  defineProps<{
    id: string
    variants: Variant<TVariantKey, TVariantValue>[]
    enabled?: boolean
    default?: NoInfer<TVariantKey>
  }>(),
  {
    enabled: undefined,
    default: undefined,
  }
)

const { result } = useABTest({
  id: props.id,
  variants: props.variants,
  enabled: props.enabled,
  default: props.default,
})

const slots = useSlots()

props.variants.forEach(variant => {
  if (!(variant.id in slots)) {
    console.warn(`nuxt-ab-testing: Missing slot "${variant.id}" for ${props.id} A/B test`)
  }
})
</script>

<template>
  {{ result }}
  <template v-if="result !== undefined">
    <template v-for="variant in variants" :key="variant.id">
      <template v-if="result.id === variant.id">
        <slot :name="variant.id" v-bind="variant" />
      </template>
    </template>
  </template>
</template>
