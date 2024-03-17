declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    abTesting: {
      persistVariants: boolean
      variantMaxAge: number
    }
  }
}

export type JSONValue = string | number | boolean | null | JSONArray | JSONObject

export interface JSONObject {
  [key: string]: JSONValue
}
export type JSONArray = JSONValue[]

export interface Variant<TVariantValue extends JSONValue> {
  id: string
  value: TVariantValue
  weight?: number
}

export interface ResolvedVariant<TVariantValue extends JSONValue> {
  id: string
  value: TVariantValue
}

export interface ABTestResultEnabled<TVariantValue extends JSONValue> {
  enabled: true
  result: ResolvedVariant<TVariantValue>
}

export interface ABTestResultDisabled<TVariantValue extends JSONValue> {
  enabled: false
  result?: ResolvedVariant<TVariantValue>
}

export type ABTestResult<TVariantValue extends JSONValue> =
  | ABTestResultEnabled<TVariantValue>
  | ABTestResultDisabled<TVariantValue>

export interface ABTest<TVariantValue extends JSONValue = JSONValue> {
  id: string
  variants: Variant<TVariantValue>[]
  /**
   * Indicates whether the A/B test is enabled or not.
   * By default, the test is considered to be enabled.
   * If `false`, the `default` property must be provided with the id of the default variant.
   */
  enabled?: boolean

  /**
   * The id of the default variant to use when the test is not enabled (`enabled` is `false`).
   * This property is required when `enabled` is `false` to specify which variant should be considered the default.
   */
  default?: string
}
