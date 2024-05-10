import { ProductType } from '@/domain/product/entity/product_type'
import { MockRepository } from '@/test/test.utils'
import { InputCreateProductDto } from '@/usecase/product/create/create.product.dto'
import CreateProductUseCase from '@/usecase/product/create/create.product.usecase'

describe('Create product usecase test', () => {
  it('should create a product', async () => {
    // Arrange - Given
    const productRepository = MockRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input: InputCreateProductDto = {
      type: ProductType.A,
      name: 'Product 1',
      price: 10,
    }

    // Act - When
    const output = await usecase.execute(input)

    // Assert - Then
    expect(productRepository.create).toHaveBeenCalledTimes(1)
    expect(productRepository.create).toHaveBeenLastCalledWith(
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
    })
  })

  it('should throw an error when name is missing', async () => {
    // Arrange - Given
    const productRepository = MockRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input: InputCreateProductDto = {
      type: ProductType.A,
      name: '',
      price: 10,
    }

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('Name is required')
  })

  it('should throw an error when price is equal to zero', async () => {
    // Arrange - Given
    const productRepository = MockRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input: InputCreateProductDto = {
      type: ProductType.A,
      name: 'Product 1',
      price: 0,
    }

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('Price must be greater than zero')
  })

  it('should throw an error when price is less than zero', async () => {
    // Arrange - Given
    const productRepository = MockRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input: InputCreateProductDto = {
      type: ProductType.A,
      name: 'Product 1',
      price: -10,
    }

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('Price must be greater than zero')
  })

  it('should throw an error when type is missing', async () => {
    const productRepository = MockRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input: InputCreateProductDto = {
      type: undefined,
      name: 'Product 1',
      price: 10,
    }

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('Invalid product type')
  })
})
