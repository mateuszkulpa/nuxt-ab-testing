# Nuxt A/B Testing

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

🚧 **This project is currently under development and not yet production ready.**

Nuxt module designed to seamlessly integrate A/B testing.

- [✨ Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/mateuszkulpa/nuxt-ab-testing?file=playground%2Fapp.vue)
- [📖 Documentation](https://nuxt-ab-testing.vercel.app)

## Planned features

- 🔄 Dynamic variant assignment
- ⚙️ Comprehensive configuration options
- 📐 Extensible variant definitions
- 📅 Scheduled testing controls
- 📊 Analytics and event tracking
- 🛠 Developer tools and internal analytics dashboard
- 💾 Flexible storage options

## Quick Setup

1. Add `nuxt-ab-testing` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-ab-testing

# Using yarn
yarn add --dev nuxt-ab-testing

# Using npm
npm install --save-dev nuxt-ab-testing
```

2. Add `nuxt-ab-testing` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-ab-testing'
  ]
})
```

That's it! You can now use Nuxt A/B Testing in your Nuxt app ✨

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-ab-testing/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-ab-testing

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-ab-testing.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-ab-testing

[license-src]: https://img.shields.io/npm/l/nuxt-ab-testing.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-ab-testing

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
