import { Schema } from "mongoose"

export interface IProduct {
  product_name: string
  product_thumb: string
  product_description: string
  product_price: number
  product_quantity: number
  product_type: string
  product_shop: Schema.Types.ObjectId
  product_attribute: any
  product_slug: string
  product_ratingsAverage: number
  product_variations: any
  isDraft: boolean
  isPublished: boolean
}