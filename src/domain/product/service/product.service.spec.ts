import Product from '@/domain/product/entity/product'
import ProductService from '@/domain/product/service/product.service'

describe('Product service unit tests', () => {
  it('should change the prices of all products', () => {
    const product1: Product = new Product('1', 'Product 1', 10)
    const product2: Product = new Product('2', 'Product 2', 20)
    const products = [product1, product2]

    ProductService.increasePrices(products, 100)

    expect(product1.price).toBe(20)
    expect(product2.price).toBe(40)
  })

  it('should throw an error when changing the price of a product to a negative value', () => {
    const product: Product = new Product('1', 'Product 1', 10)

    expect(() => {
      ProductService.increasePrices([product], -100)
    }).toThrow('Price must be greater than zero')
  })

  it('should throw an error when changing the price of a product to NaN', () => {
    const product: Product = new Product('1', 'Product 1', 10)

    expect(() => {
      ProductService.increasePrices([product], NaN)
    }).toThrow('Price must be a number')
  })

  it('should throw an error when changing the price of a product to Infinity', () => {
    const product: Product = new Product('1', 'Product 1', 10)

    expect(() => {
      ProductService.increasePrices([product], Infinity)
    }).toThrow('Price must be a finite number')
  })
})
