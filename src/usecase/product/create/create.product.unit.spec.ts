import { ProductType } from '@/domain/product/entity/product_type'
import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import { MockRepository } from '@/test/test.utils'
import { InputCreateProductDto } from '@/usecase/product/create/create.product.dto'
import CreateProductUseCase from '@/usecase/product/create/create.product.usecase'

describe('Create product use case unit test', () => {
  let repository: ProductRepositoryInterface
  let usecase: CreateProductUseCase
  let input_a: InputCreateProductDto
  let input_b: InputCreateProductDto

  beforeEach(async () => {
    repository = MockRepository()
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

  it('should create a product type a', async () => {
    // Arrange - Given

    // Act - When
    const output = await usecase.execute(input_a)

    // Assert - Then
    expect(repository.create).toHaveBeenCalledTimes(1)
    expect(repository.create).toHaveBeenLastCalledWith(
      expect.objectContaining({
        _id: expect.any(String),
        _name: 'Product 1',
        _price: 10,
      })
    )

    expect(output).toEqual({
      id: expect.any(String),
      name: 'Product 1',
      price: 10,
      type: ProductType.A,
    })
  })

  it('should create a product type b', async () => {
    // Arrange - Given

    // Act - When
    const output = await usecase.execute(input_b)

    // Assert - Then
    expect(repository.create).toHaveBeenCalledTimes(1)
    expect(repository.create).toHaveBeenLastCalledWith(
      expect.objectContaining({
        _id: expect.any(String),
        _name: 'Product 2',
        _price: 20,
      })
    )

    expect(output).toEqual({
      id: expect.any(String),
      name: 'Product 2',
      price: 40,
      type: ProductType.B,
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
    // Arrange - Given
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
