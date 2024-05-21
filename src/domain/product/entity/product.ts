import Entity from '@/domain/@shared/entity/entity.abstract'
import ProductInterface from '@/domain/product/entity/product.interface'
import { ProductType } from '@/domain/product/entity/product_type'
import ProductValidatorFactory from '@/domain/product/factory/product.validator.factory'

export default class Product extends Entity implements ProductInterface {
  static readonly TYPE: ProductType = ProductType.A
  private _name: string
  private _price: number

  constructor(id: string, name: string, price: number) {
    super()
    this._id = id
    this._name = name
    this._price = price
    this.validate()
  }

  get contextName(): string {
    return 'Product A'
  }

  validate() {
    ProductValidatorFactory.create(). validate(this)
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }

  get type(): ProductType {
    return Product.TYPE
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changePrice(price: number) {
    this._price = price
    this.validate()
  }
}
