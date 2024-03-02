<script setup lang="ts" generic="TValue extends JSONValue">
import type { JSONValue, Variant } from '../types/variant'
import { useState } from '#imports'

const props = defineProps<{
  id: string
  variants: Variant<TValue>[]
}>()

const randomVariant = useState(
  `ab-test:${props.id}`,
  () => props.variants[Math.floor(Math.random() * props.variants.length)]
)
</script>

<template>
  <template
    v-for="variant in variants"
    :key="variant.id"
  >
    <template v-if="randomVariant.id === variant.id">
      <slot
        :name="variant.id"
        v-bind="variant"
      />
    </template>
  </template>
</template>
