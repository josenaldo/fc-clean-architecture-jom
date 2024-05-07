import OrderFactory from '@/domain/checkout/factory/order.factory'
import { v4 as uuid } from 'uuid'

describe('Order factory Unit Tests', () => {
  it('should create an order', () => {
    // Arrange - Given
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: 'Product 1',
          productId: uuid(),
          quantity: 2,
          price: 100,
        },
      ],
    }

    // Act - When
    const order = OrderFactory.create(orderProps)

    // Assert - Then
    expect(order.id).toBeDefined()
    expect(order.customerId).toBe(orderProps.customerId)
    expect(order.items).toHaveLength(1)
    expect(order.items[0].id).toBeDefined()
    expect(order.items[0].name).toBe('Product 1')
    expect(order.items[0].quantity).toBe(2)
    expect(order.items[0].price).toBe(100)
    expect(order.total).toBe(200)
  })
})
