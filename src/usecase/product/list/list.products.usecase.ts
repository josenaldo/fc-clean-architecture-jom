import ProductInterface from '@/domain/product/entity/product.interface'
import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import {
  InputListProductsDto,
  OutputListProductsDto,
} from '@/usecase/product/list/list.product.dto'

export default class ListProductsUseCase {
  private repository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.repository = productRepository
  }

  async execute(input: InputListProductsDto): Promise<OutputListProductsDto> {
    const products = await this.repository.findAll()

    return OutputMapper.toOutput(products)
  }
}

class OutputMapper {
  static toOutput(products: ProductInterface[]): OutputListProductsDto {
    const results = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
    }))

    return {
      totalCount: results.length,
      data: results,
    }
  }
}
