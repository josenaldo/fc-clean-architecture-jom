import { ProductType } from '@/domain/product/entity/product_type'

export default interface ProductInterface {
  get id(): string
  get name(): string
  get price(): number
  get type(): ProductType

  changeName(name: string): void
  changePrice(price: number): void
}
