import "server-only"
import { createMedusaClient } from "./client"
import type { ProductCardModel, ProductDetailModel } from "./types"

type MedusaProduct = {
  id: string
  handle?: string | null
  title: string
  subtitle?: string | null
  description?: string | null
  thumbnail?: string | null
  metadata?: Record<string, unknown> | null
  variants?: Array<{ id: string; title: string }> | null
}

const toCard = (product: MedusaProduct): ProductCardModel => ({
  id: product.id,
  handle: product.handle || product.id,
  title: product.title,
  subtitle: product.subtitle || null,
  thumbnail: product.thumbnail || null,
  origin: typeof product.metadata?.origin === "string" ? product.metadata.origin : null,
})

export const listProducts = async (): Promise<ProductCardModel[]> => {
  const sdk = createMedusaClient()
  const { products } = await sdk.store.product.list({ limit: 24 })
  return (products as MedusaProduct[]).map(toCard)
}

export const retrieveProduct = async (handle: string): Promise<ProductDetailModel | null> => {
  const sdk = createMedusaClient()
  const { products } = await sdk.store.product.list({ handle, limit: 1 })
  const product = (products as MedusaProduct[])[0]
  if (!product) return null
  return {
    ...toCard(product),
    description: product.description || null,
    variants: product.variants?.map(({ id, title }) => ({ id, title })) || [],
  }
}
