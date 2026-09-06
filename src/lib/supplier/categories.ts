/**
 * Extensible supplier product-category registry. Add a category by adding
 * an entry here — never by adding category-specific columns
 * (`coffee_*`/`vanilla_*`) to the supplier capability schema.
 */
export type SupplierCapabilityCategory = {
  key: string
  label: string
}

export const SUPPLIER_CAPABILITY_CATEGORIES: readonly SupplierCapabilityCategory[] = [
  { key: "coffee", label: "Coffee" },
  { key: "vanilla", label: "Vanilla" },
  { key: "other", label: "Other" },
]

export const isSupplierCapabilityCategory = (value: string): boolean =>
  SUPPLIER_CAPABILITY_CATEGORIES.some((category) => category.key === value)
