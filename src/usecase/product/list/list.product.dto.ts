export interface InputListProductsDto {}

type ProductResult = {
  id: string
  name: string
  price: number
  type: string
}

export interface OutputListProductsDto {
  totalCount: number
  data: ProductResult[]
}
