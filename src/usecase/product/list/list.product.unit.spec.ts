import ProductInterface from '@/domain/product/entity/product.interface'
import { ProductType } from '@/domain/product/entity/product_type'
import ProductFactory from '@/domain/product/factory/product.factory'
import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import { MockRepository } from '@/test/test.utils'

describe('List product use case unit test ', () => {
  let product_a: ProductInterface
  let product_b: ProductInterface
  let productRepository: ProductRepositoryInterface

  beforeEach(async () => {
    product_a = ProductFactory.create(ProductType.A, 'Product A', 100)
    product_b = ProductFactory.create(ProductType.B, 'Product B', 200)

    productRepository = MockRepository()
  })

  it('should list the products', async () => {
    productRepository = MockRepository()
  })

  it('should return an empty list when there are no products', async () => {})
})
