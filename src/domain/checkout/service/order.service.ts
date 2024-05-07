import { v4 as uuid } from 'uuid'

import Order from '@/domain/checkout/entity/order'
import OrderItem from '@/domain/checkout/entity/order_item'
import Customer from '@/domain/customer/entity/customer'

export default class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc: number, order: Order) => {
      return acc + order.total
    }, 0)
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item')
    }

    const orderId: string = uuid()
    const order: Order = new Order(orderId, customer.id, items)
    const newRewardPoints = order.total / 2
    customer.addRewardPoints(newRewardPoints)

    return order
  }
}
