<template>
  <div>
    <h1>Nuxt A/B Testing module playground</h1>

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
  </div>
</template>
