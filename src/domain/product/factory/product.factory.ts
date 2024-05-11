import { v4 as uuid } from 'uuid'

import Product from '@/domain/product/entity/product'
import ProductInterface from '@/domain/product/entity/product.interface'
import ProductB from '@/domain/product/entity/product_b'
import { ProductType } from '@/domain/product/entity/product_type'

export default class ProductFactory {
  public static create(
    type: ProductType,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case Product.TYPE:
        return new Product(uuid(), name, price)
      case ProductB.TYPE:
        return new ProductB(uuid(), name, price)
      default:
        throw new Error('Invalid product type')
    }
  }

  public static restore(
    type: string,
    id: string,
    name: string,
    price: number
  ): ProductInterface {
    const productType = type as ProductType

    switch (productType) {
      case Product.TYPE:
        return new Product(id, name, price)
      case ProductB.TYPE:
        return new ProductB(id, name, price / 2)
      default:
        throw new Error('Invalid product type')
    }
  }
}
