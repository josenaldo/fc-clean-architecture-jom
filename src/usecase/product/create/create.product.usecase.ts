import ProductInterface from '@/domain/product/entity/product.interface'
import ProductFactory from '@/domain/product/factory/product.factory'
import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from '@/usecase/product/create/create.product.dto'

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    //criar produto
    const product: ProductInterface = ProductFactory.create(
      input.type,
      input.name,
      input.price
    )

    //salvar produto no repositorio
    await this.productRepository.create(product)

    //retornar produto com ID
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}
