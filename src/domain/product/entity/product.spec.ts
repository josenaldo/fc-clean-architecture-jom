/* eslint @typescript-eslint/no-unused-vars: 0 */

import Product from '@/domain/product/entity/product'

describe('Product unit tests', () => {
  it('should throw an error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 1', 100) // NOSONAR
    }).toThrow('ID is required')
  })

  it('should throw an error when name is empty', () => {
    expect(() => {
      const product = new Product('1', '', 100) // NOSONAR
    }).toThrow('Name is required')
  })

  it('should throw an error when name is only spaces', () => {
    expect(() => {
      const product = new Product('1', '   ', 100) // NOSONAR
    }).toThrow('Name is required')
  })

  it('should throw an error when price is zero', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', 0) // NOSONAR
    }).toThrow('Price must be greater than zero')
  })

  it('should throw an error when price is negative', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', -1) // NOSONAR
    }).toThrow('Price must be greater than zero')
  })

  it('should throw an error when price is not a number', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', NaN) // NOSONAR
    }).toThrow('Price must be a number')
  })

  it('should throw an error when price is not a finite number', () => {
    expect(() => {
      const product = new Product('1', 'Product 1', Infinity) // NOSONAR
    }).toThrow('Price must be a finite number')
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
    expect(() => {
      product.changeName('')
    }).toThrow('Name is required')
  })

  it('should throw an error when changeName to only spaces', () => {
    const product = new Product('1', 'Product 1', 100)
    expect(() => {
      product.changeName('   ')
    }).toThrow('Name is required')
  })

  it('should change price', () => {
    const product = new Product('1', 'Product 1', 100)
    product.changePrice(200)
    expect(product.price).toBe(200)
  })

  it('should throw an error when changePrice to zero', () => {
    const product = new Product('1', 'Product 1', 100)
    expect(() => {
      product.changePrice(0)
    }).toThrow('Price must be greater than zero')
  })

  it('should throw an error when changePrice to negative', () => {
    const product = new Product('1', 'Product 1', 100)
    expect(() => {
      product.changePrice(-1)
    }).toThrow('Price must be greater than zero')
  })

  it('should throw an error when changePrice to NaN', () => {
    const product = new Product('1', 'Product 1', 100)
    expect(() => {
      product.changePrice(NaN)
    }).toThrow('Price must be a number')
  })

  it('should throw an error when changePrice to Infinity', () => {
    const product = new Product('1', 'Product 1', 100)
    expect(() => {
      product.changePrice(Infinity)
    }).toThrow('Price must be a finite number')
  })
})
