/**
 * Given TYPE map to a new type with keys that have type PROP_TYPE
 */
export type PropertiesOfType<TYPE, PROP_TYPE> = {
  [K in keyof TYPE]-?: TYPE[K] extends PROP_TYPE ? K : PROP_TYPE
}[keyof TYPE];
