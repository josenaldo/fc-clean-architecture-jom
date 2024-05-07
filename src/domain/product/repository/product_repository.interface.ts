import RepositoryInterface from '@/domain/@shared/repository/repository.interface'
import Product from '@/domain/product/entity/product'

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
