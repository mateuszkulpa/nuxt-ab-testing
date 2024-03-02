export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONArray
  | JSONObject

export interface JSONObject { [key: string]: JSONValue }
export type JSONArray = JSONValue[]

export interface Variant<TVal extends JSONValue> {
  id: string
  value?: TVal
}
