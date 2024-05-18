import Entity from '@/domain/@shared/entity/entity.abstract'
import ProductInterface from '@/domain/product/entity/product.interface'
import { ProductType } from '@/domain/product/entity/product_type'

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
    if (this._id.length === 0) {
      this.addNotificationError('ID is required')
    }

    if (this._name.trim().length === 0) {
      this.addNotificationError('Name is required')
    }

    if (this._price <= 0) {
      this.addNotificationError('Price must be greater than zero')
    }

    if (isNaN(this._price)) {
      this.addNotificationError('Price must be a number')
    }

    if (!isFinite(this._price)) {
      this.addNotificationError('Price must be a finite number')
    }

    this.throwIfHasNotificationErrors()
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
