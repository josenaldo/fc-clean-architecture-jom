import ProductInterface from '@/domain/product/entity/product.interface'
import { ProductType } from '@/domain/product/entity/product_type'
import ProductFactory from '@/domain/product/factory/product.factory'
import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '@/infrastructure/product/repository/sequelize/product.repository'
import { createSequelize } from '@/test/test.utils'
import ListProductsUseCase from '@/usecase/product/list/list.products.usecase'
import { Sequelize } from 'sequelize-typescript'

describe('List product use case unit test ', () => {
  let sequelize: Sequelize
  let repository: ProductRepositoryInterface
  let usecase: ListProductsUseCase
  let product_a: ProductInterface
  let product_b: ProductInterface

  beforeEach(async () => {
    sequelize = createSequelize()
    sequelize.addModels([ProductModel])
    await sequelize.sync()

    repository = new ProductRepository()
    usecase = new ListProductsUseCase(repository)

    product_a = ProductFactory.create(ProductType.A, 'Product A', 100)
    product_b = ProductFactory.create(ProductType.B, 'Product B', 200)
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should list the products', async () => {
    // Arrange - Given
    repository.create(product_a)
    repository.create(product_b)

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
    // Act - When
    const output = await usecase.execute({})

    // Assert - Then
    expect(output.totalCount).toBe(0)
    expect(output.data).toBeDefined()
    expect(output.data).toHaveLength(0)
  })
})
