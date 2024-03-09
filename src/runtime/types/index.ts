declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    abTesting: {
      persistVariants: boolean
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

export interface ABTest<TVariantValue extends JSONValue = JSONValue> {
  id: string
  variants: Variant<TVariantValue>[]
}
