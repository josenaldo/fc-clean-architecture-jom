import OrderItem from '@/domain/checkout/entity/order_item'

export default class Order {
  private _id: string
  private _customerId: string
  private _items: OrderItem[]

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this.validate()
  }

  validate(): void {
    if (!this._id) {
      throw new Error('ID is required')
    }

    if (!this._customerId) {
      throw new Error('Customer ID is required')
    }

    if (this._items.length === 0) {
      throw new Error('Items are required')
    }
  }

  get id(): string {
    return this._id
  }

  get customerId(): string {
    return this._customerId
  }

  get items(): OrderItem[] {
    return this._items
  }

  get total(): number {
    return this._items.reduce((total, item) => total + item.total, 0)
  }

  addItem(item: OrderItem): void {
    this._items.push(item)
  }
}
