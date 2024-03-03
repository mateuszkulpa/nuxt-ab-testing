import {
  addComponentsDir,
  addPlugin,
  createResolver,
  defineNuxtModule
} from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Determines whether to persist A/B test variants across user sessions.
   * If enabled (true), the assigned variant is stored in a cookie on the user's device
   *
   * @default true
   */
  persistVariants: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ab-testing',
    configKey: 'abTesting'
  },
  defaults: {
    persistVariants: true
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))

    await addComponentsDir({
      path: resolver.resolve('./runtime/components')
    })

    nuxt.options.runtimeConfig.public.abTesting = {
      persistVariants: options.persistVariants
    }
  }
})
