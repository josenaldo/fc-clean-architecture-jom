import ProductInterface from '@/domain/product/entity/product.interface'
import { ProductType } from '@/domain/product/entity/product_type'
import ProductFactory from '@/domain/product/factory/product.factory'
import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import { MockRepository } from '@/test/test.utils'
import {
  InputFindProductDto,
  OutputFindProductDto,
} from '@/usecase/product/find/find.product.dto'
import FindProductUseCase from '@/usecase/product/find/find.product.usecase'

describe('Find product usecase unit tests ', () => {
  let product_a: ProductInterface
  let product_b: ProductInterface
  let productRepository: ProductRepositoryInterface

  beforeEach(async () => {
    product_a = ProductFactory.create(ProductType.A, 'Product A', 100)
    product_b = ProductFactory.create(ProductType.B, 'Product B', 200)

    productRepository = MockRepository()
  })

  it('should find a product type A', async () => {
    // Arrange - Given
    productRepository.find = jest.fn().mockResolvedValue(product_a)

    const usecase = new FindProductUseCase(productRepository)

    const input: InputFindProductDto = {
      id: product_a.id,
    }

    // Act - When
    const output: OutputFindProductDto = await usecase.execute(input)

    // Assert - Then
    const expectedOutput = {
      id: product_a.id,
      name: 'Product A',
      price: 100,
      type: ProductType.A,
    }

    expect(output).toStrictEqual(expectedOutput)
  })

  it('should find a product type B', async () => {
    // Arrange - Given
    productRepository.find = jest.fn().mockResolvedValue(product_b)

    const usecase = new FindProductUseCase(productRepository)

    const input: InputFindProductDto = {
      id: product_b.id,
    }

    // Act - When
    const output: OutputFindProductDto = await usecase.execute(input)

    // Assert - Then
    const expectedOutput = {
      id: product_b.id,
      name: 'Product B',
      price: 400,
      type: ProductType.B,
    }

    expect(output).toStrictEqual(expectedOutput)
  })

  it('should throw an error when product not found', async () => {
    // Arrange - Given
    productRepository.find = jest
      .fn()
      .mockRejectedValue(new Error('Product not found'))

    const usecase = new FindProductUseCase(productRepository)

    const input: InputFindProductDto = {
      id: '123',
    }

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('Product not found')
  })

  it.each`
    id           | label         | expected
    ${null}      | ${'null'}     | ${'Id is required for finding a product'}
    ${undefined} | ${'unefined'} | ${'Id is required for finding a product'}
    ${''}        | ${'empty'}    | ${'Id is required for finding a product'}
  `(
    'should throw an error when id is $label',
    async ({ id, label, expected }) => {
      // Arrange - Given
      const usecase = new FindProductUseCase(productRepository)

      const input: InputFindProductDto = {
        id: id,
      }

      // Act - When
      const output = usecase.execute(input)

      // Assert - Then
      await expect(output).rejects.toThrow(expected)
    }
  )
})
