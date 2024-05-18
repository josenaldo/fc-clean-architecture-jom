/* eslint @typescript-eslint/no-unused-vars: 0 */

import NotificationError from '@/domain/@shared/notification/notification.error'
import Product from '@/domain/product/entity/product'
import ProductB from '@/domain/product/entity/product_b'

describe('Product unit tests', () => {
  it('should throw an error when id is empty', () => {
    const f = () => {
      const product = new Product('', 'Product 1', 100) // NOSONAR
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: ID is required')
  })

  it('should throw an error when name is empty', () => {
    const f = () => {
      const product = new Product('1', '', 100) // NOSONAR
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Name is required')
  })

  it('should throw an error when name is only spaces', () => {
    const f = () => {
      const product = new Product('1', '   ', 100) // NOSONAR
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Name is required')
  })

  it('should throw an error when price is zero', () => {
    const f = () => {
      const product = new Product('1', 'Product 1', 0) // NOSONAR
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Price must be greater than zero')
  })

  it('should throw an error when price is negative', () => {
    const f = () => {
      const product = new Product('1', 'Product 1', -1) // NOSONAR
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Price must be greater than zero')
  })

  it('should throw an error when price is not a number', () => {
    const f = () => {
      const product = new Product('1', 'Product 1', NaN) // NOSONAR
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Price must be a number')
  })

  it('should throw an error when price is not a finite number', () => {
    const f = () => {
      const product = new Product('1', 'Product 1', Infinity) // NOSONAR
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Price must be a finite number')
  })

  it('should change name', () => {
    // Arrange - Given
    const product = new Product('1', 'Product 1', 100)

    // Act - When
    product.changeName('Product 2')

    // Assert - Then
    expect(product.name).toBe('Product 2')
  })

  it('should throw an error when changeName to empty', () => {
    const product = new Product('1', 'Product 1', 100)

    const f = () => {
      product.changeName('')
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Name is required')
  })

  it('should throw an error when changeName to only spaces', () => {
    const product = new Product('1', 'Product 1', 100)
    const f = () => {
      product.changeName('   ')
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Name is required')
  })

  it('should change price', () => {
    const product = new Product('1', 'Product 1', 100)
    product.changePrice(200)
    expect(product.price).toBe(200)
  })

  it('should throw an error when changePrice to zero', () => {
    const product = new Product('1', 'Product 1', 100)
    const f = () => {
      product.changePrice(0)
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Price must be greater than zero')
  })

  it('should throw an error when changePrice to negative', () => {
    const product = new Product('1', 'Product 1', 100)
    const f = () => {
      product.changePrice(-1)
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Price must be greater than zero')
  })

  it('should throw an error when changePrice to NaN', () => {
    const product = new Product('1', 'Product 1', 100)
    const f = () => {
      product.changePrice(NaN)
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Price must be a number')
  })

  it('should throw an error when changePrice to Infinity', () => {
    const product = new Product('1', 'Product 1', 100)
    const f = () => {
      product.changePrice(Infinity)
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('product a: Price must be a finite number')
  })

  it('should throw an error with some notifications for product a', () => {
    const f = () => {
      const product = new Product('', '', -1)
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow(
      'product a: ID is required, Name is required, Price must be greater than zero'
    )
  })

  it('should throw an error with some notifications for product b', () => {
    const f = () => {
      const product = new ProductB('', '', 0)
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow(
      'product b: ID is required, Name is required, Price must be greater than zero'
    )
  })
})
