<template>
  <div>
    <h1>Nuxt A/B Testing module playground</h1>

    <RemoteABTest id="theme">
      <template #dark>dark</template>
      <template #light>light</template>
    </RemoteABTest>
    <hr />

    <h2>Component with inline variants</h2>
    <ABTest
      id="inline-values"
      :variants="[
        { id: 'sign-up', value: 'Sign Up Now!' },
        { id: 'join-free', value: 'Join Free for a Month' },
      ]"
    >
      <template #sign-up="{ value }">
        <button>{{ value }}</button>
      </template>
      <template #join-free="{ value }">
        <button>{{ value }}</button>
      </template>
    </ABTest>

    <hr />

    <h2>Component with inline variants as objects</h2>

    <ABTest
      id="inline-object-values"
      :variants="[
        { id: 'red', value: { background: 'red', color: 'yellow' } },
        { id: 'green', value: { background: 'green', color: 'white' } },
      ]"
    >
      <template #red="{ value }">
        <button :style="value">
          {{ value.background }}
        </button>
      </template>
      <template #green="{ value }">
        <button :style="value">
          {{ value.background }}
        </button>
      </template>
    </ABTest>

    <hr />

    <h2>Component with inline weighted variants</h2>

    <ABTest
      id="inline-weighted-values"
      :variants="[
        { id: 'a', value: '10%', weight: 0.1 },
        { id: 'b', value: '90%', weight: 0.9 },
      ]"
    >
      <template #a="{ value }">
        {{ value }}
      </template>
      <template #b="{ value }">
        {{ value }}
      </template>
    </ABTest>

    <hr />

    <h2>Component with disabled test</h2>

    <ABTest
      id="disabled-test"
      :enabled="false"
      :variants="[
        { id: 'a', value: '10%' },
        { id: 'b', value: '90%' },
      ]"
    >
      <template #a="{ value }">
        {{ value }}
      </template>
      <template #b="{ value }">
        {{ value }}
      </template>
    </ABTest>

    <hr />

    <h2>Composable</h2>
    <div v-if="composableResult.enabled">variant: {{ composableResult.result.value }}</div>
  </div>
</template>

<script setup lang="ts">
const composableResult = useABTest({
  id: 'composable-example',
  variants: [
    { id: 'variant-1', value: 'Variant 1' },
    { id: 'variant-2', value: 'Variant 2' },
    { id: 'variant-3', value: 'Variant 3' },
  ],
})
</script>
