<template>
  <h1>Composables fixture</h1>
  <p>variant: {{ result.value }}</p>
</template>

<script setup lang="ts">
const { result } = useHeaderABTest()
</script>
