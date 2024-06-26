import ProductInterface from '@/domain/product/entity/product.interface'
import { ProductType } from '@/domain/product/entity/product_type'
import ProductFactory from '@/domain/product/factory/product.factory'
import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import { MockRepository } from '@/test/test.utils'
import ListProductsUseCase from '@/usecase/product/list/list.products.usecase'

describe('List product use case unit test ', () => {
  let repository: ProductRepositoryInterface
  let usecase: ListProductsUseCase
  let product_a: ProductInterface
  let product_b: ProductInterface

  beforeEach(async () => {
    repository = MockRepository()
    usecase = new ListProductsUseCase(repository)

    product_a = ProductFactory.create(ProductType.A, 'Product A', 100)
    product_b = ProductFactory.create(ProductType.B, 'Product B', 200)
  })

  it('should list the products', async () => {
    // Arrange - Given
    repository.findAll = jest
      .fn()
      .mockReturnValue(Promise.resolve([product_a, product_b]))

    // Act - When
    const output = await usecase.execute({})

    // Assert - Then
    expect(output.totalCount).toBe(2)
    expect(output.data).toBeDefined()
    expect(output.data).toHaveLength(2)
    expect(output.data).toEqual([
      {
        id: product_a.id,
        name: product_a.name,
        price: product_a.price,
        type: product_a.type,
      },
      {
        id: product_b.id,
        name: product_b.name,
        price: product_b.price,
        type: product_b.type,
      },
    ])
  })

  it('should return an empty list when there are no products', async () => {
    // Arrange - Given
    repository.findAll = jest.fn().mockReturnValue(Promise.resolve([]))

    // Act - When
    const output = await usecase.execute({})

    // Assert - Then
    expect(output.totalCount).toBe(0)
    expect(output.data).toBeDefined()
    expect(output.data).toHaveLength(0)
  })
})
