import ProductInterface from '@/domain/product/entity/product.interface'
import { ProductType } from '@/domain/product/entity/product_type'
import ProductFactory from '@/domain/product/factory/product.factory'
import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '@/infrastructure/product/repository/sequelize/product.repository'
import { createSequelize } from '@/test/test.utils'
import { InputUpdateProductDto } from '@/usecase/product/update/update.product.dto'
import UpdateProductUseCase from '@/usecase/product/update/update.product.usecase'
import { Sequelize } from 'sequelize-typescript'

describe('Update product use case unit tests', () => {
  let sequelize: Sequelize
  let repository: ProductRepositoryInterface
  let usecase: UpdateProductUseCase
  let product_a: ProductInterface
  let product_b: ProductInterface
  let input_a: InputUpdateProductDto
  let input_b: InputUpdateProductDto

  beforeEach(async () => {
    sequelize = createSequelize()
    sequelize.addModels([ProductModel])
    await sequelize.sync()

    repository = new ProductRepository()
    usecase = new UpdateProductUseCase(repository)

    product_a = ProductFactory.create(ProductType.A, 'Product A', 100)
    product_b = ProductFactory.create(ProductType.B, 'Product B', 200)

    await repository.create(product_a)
    await repository.create(product_b)

    input_a = {
      id: product_a.id,
      name: 'Product A Updated',
      price: 150,
    }

    input_b = {
      id: product_b.id,
      name: 'Product B Updated',
      price: 250,
    }
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should update a product type A', async () => {
    // Arrange - Given

    // Act - When
    const output = usecase.execute(input_a)

    // Assert - Then
    await expect(output).resolves.toEqual({
      id: product_a.id,
      name: input_a.name,
      price: input_a.price,
      type: product_a.type,
    })
  })

  it('should update a product type B', async () => {
    // Arrange - Given
    const expectedNewPrice = input_b.price * 2

    // Act - When
    const output = usecase.execute(input_b)

    // Assert - Then
    await expect(output).resolves.toEqual({
      id: product_b.id,
      name: input_b.name,
      price: expectedNewPrice,
      type: product_b.type,
    })
  })

  it('should throw an error when product not found', async () => {
    // Arrange - Given
    input_a.id = '123'

    // Act - When
    const output = usecase.execute(input_a)

    // Assert - Then
    await expect(output).rejects.toThrow('Product not found')
  })

  it('should throw an error when new name is empty', async () => {
    // Arrange - Given
    input_a.name = ''

    // Act - When
    const output = usecase.execute(input_a)

    // Assert - Then
    await expect(output).rejects.toThrow('Name is required')
  })

  it('should throw an error when new price is negative', async () => {
    // Arrange - Given
    input_a.price = -1

    // Act - When
    const output = usecase.execute(input_a)

    // Assert - Then
    await expect(output).rejects.toThrow('Price must be greater than zero')
  })

  it('should throw an error when new price is zero', async () => {
    // Arrange - Given
    input_a.price = 0

    // Act - When
    const output = usecase.execute(input_a)

    // Assert - Then
    await expect(output).rejects.toThrow('Price must be greater than zero')
  })
})
