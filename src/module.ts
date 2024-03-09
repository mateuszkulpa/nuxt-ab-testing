import {
  addComponentsDir,
  addImports,
  addImportsDir,
  addTemplate,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import type { ABTest } from './runtime/types'
import { pascalCase } from 'scule'

export interface ModuleOptions {
  /**
   * Determines whether to persist A/B test variants across user sessions.
   * If enabled (true), the assigned variant is stored in a cookie on the user's device
   *
   * @default true
   */
  persistVariants: boolean
  /**
   * List of A/B tests.
   * This will be used to automatically generate components and composables
   *
   * @default []
   */
  tests: ABTest[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ab-testing',
    configKey: 'abTesting',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    persistVariants: true,
    tests: [],
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    await addComponentsDir({
      path: resolver.resolve('./runtime/components'),
    })

    addImportsDir(resolver.resolve('./runtime/composables'))

    const composables: string[] = []
    for (const test of options.tests) {
      const composableName = `use${pascalCase(test.id)}ABTest`
      addImports({
        from: '#build/ab-test-composables',
        name: composableName,
      })
      composables.push(`export function ${composableName}() {
  return useABTest(${JSON.stringify(test)});
}`)
    }
    addTemplate({
      filename: `./ab-test-composables.ts`,
      write: true,
      getContents: () => composables.join('\n\n'),
    })

    nuxt.options.runtimeConfig.public.abTesting = {
      persistVariants: options.persistVariants,
    }
  },
})
