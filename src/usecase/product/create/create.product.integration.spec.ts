import { ProductType } from '@/domain/product/entity/product_type'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '@/infrastructure/product/repository/sequelize/product.repository'
import { createSequelize } from '@/test/test.utils'
import { InputCreateProductDto } from '@/usecase/product/create/create.product.dto'
import CreateProductUseCase from '@/usecase/product/create/create.product.usecase'
import { Sequelize } from 'sequelize-typescript'

describe('Create product use case integration tests', () => {
  let sequelize: Sequelize
  let repository: ProductRepository
  let usecase: CreateProductUseCase
  let input_a: InputCreateProductDto
  let input_b: InputCreateProductDto

  beforeEach(async () => {
    sequelize = createSequelize()
    sequelize.addModels([ProductModel])
    await sequelize.sync()

    repository = new ProductRepository()
    usecase = new CreateProductUseCase(repository)

    input_a = {
      type: ProductType.A,
      name: 'Product 1',
      price: 10,
    }

    input_b = {
      type: ProductType.B,
      name: 'Product 2',
      price: 20,
    }
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product type A', async () => {
    // Arrange - Given

    // Act - When
    const output = await usecase.execute(input_a)

    // Assert - Then
    expect(output).toEqual({
      id: expect.any(String),
      name: 'Product 1',
      price: 10,
    })
  })

  it('should create a product type B', async () => {
    // Arrange - Given

    // Act - When
    const output = await usecase.execute(input_b)

    // Assert - Then
    expect(output).toBeDefined()
    expect(output.id).toBeDefined()

    expect(output).toEqual({
      id: expect.any(String),
      name: 'Product 2',
      price: 40,
    })
  })

  it('should throw an error when name is missing', async () => {
    // Arrange - Given
    input_a.name = ''

    // Act - When
    const output = usecase.execute(input_a)

    // Assert - Then
    await expect(output).rejects.toThrow('Name is required')
  })

  it('should throw an error when price is equal to zero', async () => {
    // Arrange - Given
    input_a.price = 0

    // Act - When
    const output = usecase.execute(input_a)

    // Assert - Then
    await expect(output).rejects.toThrow('Price must be greater than zero')
  })

  it('should throw an error when price is less than zero', async () => {
    input_a.price = -10

    // Act - When
    const output = usecase.execute(input_a)

    // Assert - Then
    await expect(output).rejects.toThrow('Price must be greater than zero')
  })

  it('should throw an error when type is missing', async () => {
    // Arrange - Given
    delete input_a.type

    // Act - When
    const output = usecase.execute(input_a)

    // Assert - Then
    await expect(output).rejects.toThrow('Invalid product type')
  })
})
