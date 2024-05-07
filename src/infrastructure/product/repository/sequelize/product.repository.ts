import Product from '@/domain/product/entity/product'
import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'

export default class ProductRepository implements ProductRepositoryInterface {
  async create(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    })
  }

  async update(product: Product): Promise<void> {
    await ProductModel.update(
      { name: product.name, price: product.price },
      { where: { id: product.id } }
    )
  }

  async find(id: string): Promise<Product> {
    const model = await ProductModel.findByPk(id)
    if (!model) {
      throw new Error('Product not found')
    }

    return new Product(model.id, model.name, model.price)
  }

  async findAll(): Promise<Product[]> {
    const models = await ProductModel.findAll()

    return models.map((model) => new Product(model.id, model.name, model.price))
  }
}
