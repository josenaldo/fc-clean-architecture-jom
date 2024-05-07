import Product from '@/domain/product/entity/product'

export default class ProductService {
  static increasePrices(products: Product[], percentage: number): void {
    if (percentage <= 0) {
      throw new Error('Price must be greater than zero')
    }

    if (isNaN(percentage)) {
      throw new Error('Price must be a number')
    }

    if (!isFinite(percentage)) {
      throw new Error('Price must be a finite number')
    }

    products.forEach((product: Product) => {
      const increase = (product.price * percentage) / 100
      const newPrice = product.price + increase
      product.changePrice(newPrice)
    })
  }
}
