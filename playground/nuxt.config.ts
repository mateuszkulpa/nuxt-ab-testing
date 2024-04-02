export default defineNuxtConfig({
  modules: ['../src/module'],
  abTesting: {
    tests: [
      {
        id: 'theme',
        variants: [
          { id: 'light', value: 'light' },
          { id: 'dark', value: 'dark' },
        ],
      },
    ],
  },
  devtools: { enabled: true },
})
