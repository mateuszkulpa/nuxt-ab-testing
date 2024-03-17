export default defineNuxtConfig({
  modules: ['../../../src/module'],
  // @ts-ignore
  abTesting: {
    variantMaxAge: 60,
    tests: [
      {
        id: 'header',
        variants: [
          { id: 'a', value: 'a' },
          { id: 'b', value: 'b' },
        ],
      },
    ],
  },
})
