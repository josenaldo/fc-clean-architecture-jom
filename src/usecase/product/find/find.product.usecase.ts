import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import {
  InputFindProductDto,
  OutputFindProductDto,
} from '@/usecase/product/find/find.product.dto'

export default class FindProductUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    if (!input.id) {
      throw new Error('Id is required for finding a product')
    }

    const product = await this.productRepository.find(input.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
    }
  }
}
