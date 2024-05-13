import ProductInterface from '@/domain/product/entity/product.interface'
import ProductFactory from '@/domain/product/factory/product.factory'
import ProductRepositoryInterface from '@/domain/product/repository/product_repository.interface'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'

export default class ProductRepository implements ProductRepositoryInterface {
  async create(product: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
    })
  }

  async update(product: ProductInterface): Promise<void> {
    await ProductModel.update(
      { name: product.name, price: product.price },
      { where: { id: product.id } }
    )
  }

  async find(id: string): Promise<ProductInterface> {
    const model = await ProductModel.findByPk(id)
    if (!model) {
      throw new Error('Product not found')
    }

    return EntityMapper.toEntity(model)
  }

  async findAll(): Promise<ProductInterface[]> {
    const models = await ProductModel.findAll()

    return models.map((model) => EntityMapper.toEntity(model))
  }
}

class EntityMapper {
  static toEntity(model: ProductModel): ProductInterface {
    return ProductFactory.restore(model.type, model.id, model.name, model.price)
  }
}
