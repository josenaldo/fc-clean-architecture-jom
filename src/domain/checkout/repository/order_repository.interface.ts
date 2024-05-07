import RepositoryInterface from '@/domain/@shared/repository/repository.interface'
import Order from '@/domain/checkout/entity/order'

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
