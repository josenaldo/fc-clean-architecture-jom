import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from '@/usecase/product/update/update.product.dto'

export default class UpdateProductUseCase {
  private repository: ProductRepositoryInterface

  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    // Find the product
    const product = await this.repository.find(input.id)

    // Check if the product exists
    if (!product) {
      throw new Error('Product not found')
    }

    // Update the product
    product.changeName(input.name)
    product.changePrice(input.price)

    // Save the product
    await this.repository.update(product)

    // Return the updated product
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
    }
  }
}
