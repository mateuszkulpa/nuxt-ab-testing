<script setup lang="ts" generic="TVariantValue extends JSONValue">
import { useABTest } from '../composables/useABTest'
import type { JSONValue, Variant } from '../types'

const props = defineProps<{
  id: string
  variants: Variant<TVariantValue>[]
}>()

const selectedVariant = useABTest<TVariantValue>({
  id: props.id,
  variants: props.variants,
})
</script>

<template>
  <template v-for="variant in variants" :key="variant.id">
    <template v-if="selectedVariant.id === variant.id">
      <slot :name="variant.id" v-bind="variant" />
    </template>
  </template>
</template>
