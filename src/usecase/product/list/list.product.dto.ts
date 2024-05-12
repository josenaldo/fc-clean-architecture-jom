export interface InputListProductDto {}

type ProductResult = {
  id: string
  name: string
  price: number
  type: string
}

export interface OutputListProductDto {
  totalCount: number
  data: ProductResult[]
}
