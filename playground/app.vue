<template>
  <div>
    <h1>Nuxt A/B Testing module playground</h1>

    <hr>

    <h2>Component with inline variants</h2>
    <ABTest
      id="inline"
      :variants="[{ id: 'a' }, { id: 'b' }]"
    >
      <template #a>
        <button>Variant A</button>
      </template>

      <template #b>
        <button>Variant B</button>
      </template>
    </ABTest>

    <hr>

    <h2>Component with inline variants with values</h2>
    <ABTest
      id="inline-values"
      :variants="[
        { id: 'sign-up', value: 'Sign Up Now!' },
        { id: 'join-free', value: 'Join Free for a Month' }
      ]"
    >
      <template #sign-up="{ value }">
        <button>{{ value }}</button>
      </template>
      <template #join-free="{ value }">
        <button>{{ value }}</button>
      </template>
    </ABTest>
  </div>
</template>
