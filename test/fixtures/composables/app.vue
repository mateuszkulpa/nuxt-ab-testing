<template>
  <h1>Composables fixture</h1>
  <p>variant: {{ selectedVariants.value }}</p>
</template>

<script setup lang="ts">
const selectedVariants = useHeaderABTest()
</script>
