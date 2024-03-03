import {
  addComponentsDir,
  addPlugin,
  createResolver,
  defineNuxtModule
} from '@nuxt/kit'

export interface ModuleOptions {
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
