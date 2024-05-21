import Entity from '@/domain/@shared/entity/entity.abstract'
import ProductInterface from '@/domain/product/entity/product.interface'
import { ProductType } from '@/domain/product/entity/product_type'
import ProductValidatorFactory from '@/domain/product/factory/product.validator.factory'

export default class ProductB extends Entity implements ProductInterface {
  static readonly TYPE: ProductType = ProductType.B
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
    return 'Product B'
  }

  validate() {
    ProductValidatorFactory.create().validate(this)
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price * 2
  }

  get type(): ProductType {
    return ProductB.TYPE
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
