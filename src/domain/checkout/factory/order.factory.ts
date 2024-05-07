import Order from '@/domain/checkout/entity/order'
import OrderItem from '@/domain/checkout/entity/order_item'

interface OrderProps {
  id: string
  customerId: string
  items: {
    id: string
    name: string
    productId: string
    quantity: number
    price: number
  }[]
}

export default class OrderFactory {
  public static create(orderProps: OrderProps): Order {
    const items: OrderItem[] = orderProps.items.map((item) => {
      return new OrderItem(
        item.id,
        item.productId,
        item.name,
        item.price,
        item.quantity
      )
    })

    const order = new Order(orderProps.id, orderProps.customerId, items)
    return order
  }
}
