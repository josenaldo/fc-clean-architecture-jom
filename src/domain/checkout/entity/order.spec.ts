/* eslint @typescript-eslint/no-unused-vars: 0 */
import Order from '@/domain/checkout/entity/order'
import OrderItem from '@/domain/checkout/entity/order_item'

describe('Order unit tests', () => {
  it('should throw erro when id is empty', () => {
    expect(() => {
      const order = new Order('', '123', []) //NOSONAR
    }).toThrow('ID is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('1', '', []) //NOSONAR
    }).toThrow('Customer ID is required')
  })

  it('should have at least one item', () => {
    expect(() => {
      const order = new Order('1', '123', []) //NOSONAR
    }).toThrow('Items are required')
  })

  it('should calculate total', () => {
    const item1: OrderItem = new OrderItem('1', '123', 'p1', 100, 2)
    const item2: OrderItem = new OrderItem('2', '123', 'p2', 200, 2)

    const order1 = new Order('1', '1', [item1])
    expect(order1.total).toBe(200)

    const order2 = new Order('2', '1', [item1, item2])
    expect(order2.total).toBe(600)
  })
})
