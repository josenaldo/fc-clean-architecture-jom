import Order from '@/domain/checkout/entity/order'
import OrderItem from '@/domain/checkout/entity/order_item'
import OrderService from '@/domain/checkout/service/order.service'
import Customer from '@/domain/customer/entity/customer'

describe('Order Service unit tests', () => {
  it('should get total of all orders', () => {
    // Arrange - Given
    const orderItem1: OrderItem = new OrderItem('1', '1', 'Product 1', 100, 1)
    const orderItem2: OrderItem = new OrderItem('2', '2', 'Product 2', 200, 2)

    const order1: Order = new Order('o1', 'c123', [orderItem1])
    const order2: Order = new Order('o2', 'c456', [orderItem2])

    // Act - When
    const total: number = OrderService.total([order1, order2])

    // Assert - Then
    expect(total).toBe(500)
  })

  it('should place an order ', () => {
    // Arrange - Given
    const customer: Customer = new Customer('c123', 'John Doe')
    const item1: OrderItem = new OrderItem('i1', 'p1', 'Item 1', 10, 1)

    const order: Order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(5)
    expect(order.total).toBe(10)
  })

  it('should throw an erro when place a order with empty items', () => {
    // Arrange - Given
    const customer: Customer = new Customer('c123', 'John Doe')

    // Act - When
    expect(() => {
      OrderService.placeOrder(customer, [])
    }).toThrow('Order must have at least one item')
  })
})
