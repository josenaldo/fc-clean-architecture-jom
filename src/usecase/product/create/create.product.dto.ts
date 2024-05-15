import { ProductType } from '@/domain/product/entity/product_type'

export interface InputCreateProductDto {
  type: ProductType
  name: string
  price: number
}

export interface OutputCreateProductDto {
  id: string
  name: string
  price: number
  type: ProductType
}
