import Product from '@/domain/product/entity/product'
import ProductB from '@/domain/product/entity/product_b'
import ProductFactory from '@/domain/product/factory/product.factory'

describe('Product Factory Unit Tests', () => {
  it('should create a product type A', () => {
    // Arrange - Given

    // Act - When
    const product = ProductFactory.create('a', 'Product 1', 1)

    // Assert - Then
    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product 1')
    expect(product.price).toBe(1)
    expect(product).toBeInstanceOf(Product)
  })

  it('should create a product type B', () => {
    // Arrange - Given

    // Act - When
    const product = ProductFactory.create('b', 'Product 2', 2)

    // Assert - Then
    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product 2')
    expect(product.price).toBe(4)
    expect(product).toBeInstanceOf(ProductB)
  })

  it('should throw an error when creating an invalid product type', () => {
    // Arrange - Given

    // Assert - Then
    expect(() => {
      ProductFactory.create('c', 'Product 3', 3)
    }).toThrow('Invalid product type')
  })
})
