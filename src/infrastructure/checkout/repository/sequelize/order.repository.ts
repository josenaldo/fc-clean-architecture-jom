import Order from '@/domain/checkout/entity/order'
import OrderItem from '@/domain/checkout/entity/order_item'
import OrderRepositoryInterface from '@/domain/checkout/repository/order_repository.interface'
import OrderModel from '@/infrastructure/checkout/repository/sequelize/order.model'
import OrderItemModel from '@/infrastructure/checkout/repository/sequelize/order_item.model'

export default class OrderRepository implements OrderRepositoryInterface {
  async create(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id,
        customer_id: order.customerId,
        total: order.total,
        items: order.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    )
  }

  async update(order: Order): Promise<void> {
    try {
      await OrderModel.update(
        {
          customer_id: order.customerId,
          total: order.total,
        },
        {
          where: {
            id: order.id,
          },
        }
      )

      await OrderItemModel.destroy({
        where: {
          order_id: order.id,
        },
      })

      order.items.forEach(async (item) => {
        await OrderItemModel.create({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          order_id: order.id,
        })
      })
    } catch (error) {
      console.log('Erro na transação: ', error)
      throw error
    }
  }

  async find(id: string): Promise<Order> {
    let model
    try {
      model = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: [OrderItemModel],
      })
    } catch (error) {
      throw new Error('Order not found')
    }

    return this.modelToEntity(model)
  }

  async findAll(): Promise<Order[]> {
    const models = await OrderModel.findAll({
      include: [OrderItemModel],
    })

    return models.map((model) => this.modelToEntity(model))
  }

  private modelToEntity(model: OrderModel): Order {
    const items = model.items.map((item) => {
      return new OrderItem(
        item.id,
        item.product_id,
        item.name,
        item.price,
        item.quantity
      )
    })
    const order = new Order(model.id, model.customer_id, items)

    return order
  }
}
