import OrderItem from '@/domain/checkout/entity/order_item'

describe('OrderItem unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const orderItem = new OrderItem('', '123', 'Order Item 1', 100, 1) // NOSONAR
    }).toThrow('ID is required')
  })

  it('should throw error when productId is empty', () => {
    expect(() => {
      const orderItem = new OrderItem('1', '', 'Order Item 1', 100, 1) // NOSONAR
    }).toThrow('Product ID is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const orderItem = new OrderItem('1', '123', '', 100, 1) // NOSONAR
    }).toThrow('Name is required')
  })

  it('should throw error when price is zero', () => {
    expect(() => {
      const orderItem = new OrderItem('1', '123', 'Order Item 1', 0, 1) // NOSONAR
    }).toThrow('Price must be greater than zero')
  })

  it('should throw error when price is negative', () => {
    expect(() => {
      const orderItem = new OrderItem('1', '123', 'Order Item 1', -1, 1) // NOSONAR
    }).toThrow('Price must be greater than zero')
  })

  it('should throw error when price is not a number', () => {
    expect(() => {
      const orderItem = new OrderItem('1', '123', 'Order Item 1', NaN, 1) // NOSONAR
    }).toThrow('Price must be a number')
  })

  it('should throw error when price is not a finite number', () => {
    expect(() => {
      const orderItem = new OrderItem('1', '123', 'Order Item 1', Infinity, 1) // NOSONAR
    }).toThrow('Price must be a finite number')
  })

  it('should throw an error when quantity is zero', () => {
    expect(() => {
      const orderItem = new OrderItem('1', '123', 'Order Item 1', 100, 0) // NOSONAR
    }).toThrow('Quantity must be greater than zero')
  })

  it('should throw an error when quantity is negative', () => {
    expect(() => {
      const orderItem = new OrderItem('1', '123', 'Order Item 1', 100, -1) // NOSONAR
    }).toThrow('Quantity must be greater than zero')
  })

  it('should throw an error when quantity is not a number', () => {
    expect(() => {
      const orderItem = new OrderItem('1', '123', 'Order Item 1', 100, NaN) // NOSONAR
    }).toThrow('Quantity must be a number')
  })

  it('should throw an error when quantity is not a finite number', () => {
    expect(() => {
      const orderItem = new OrderItem('1', '123', 'Order Item 1', 100, Infinity) // NOSONAR
    }).toThrow('Quantity must be a finite number')
  })
})
