import Order from '@/domain/checkout/entity/order'
import OrderItem from '@/domain/checkout/entity/order_item'
import Customer from '@/domain/customer/entity/customer'
import Address from '@/domain/customer/value-object/address'
import Product from '@/domain/product/entity/product'
import OrderModel from '@/infrastructure/checkout/repository/sequelize/order.model'
import OrderRepository from '@/infrastructure/checkout/repository/sequelize/order.repository'
import OrderItemModel from '@/infrastructure/checkout/repository/sequelize/order_item.model'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '@/infrastructure/customer/repository/sequelize/customer.repository'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '@/infrastructure/product/repository/sequelize/product.repository'

import { Sequelize } from 'sequelize-typescript'

describe('Order Repository unit tests', () => {
  let sequelize: Sequelize
  let customer: Customer
  let product1: Product
  let product2: Product

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {
        force: true,
      },
    })

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()

    const customerRepository = new CustomerRepository()
    customer = new Customer('123', 'Customer 1')
    const address = new Address('123', 'Street 1', '11111222', 'Uberlândia')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    product1 = new Product('123', 'Product 1', 10)
    await productRepository.create(product1)

    product2 = new Product('124', 'Product 2', 20)
    await productRepository.create(product2)
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create an order', async () => {
    const orderItem = new OrderItem(
      '1',
      product1.id,
      product1.name,
      product1.price,
      2
    )
    const order = new Order('123', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findByPk(order.id, {
      include: [
        {
          model: OrderItemModel,
          as: 'items',
        },
      ],
    })

    expect(orderModel).not.toBeNull()
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product1.id,
        },
      ],
    })
  })

  it('should update an order after change order ', async () => {
    // Arrange - Given
    const orderItem = new OrderItem(
      '1',
      product1.id,
      product1.name,
      product1.price,
      2
    )

    const orderItem2 = new OrderItem(
      '2',
      product2.id,
      product2.name,
      product2.price,
      4
    )

    const order = new Order('123', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    // Act - When
    order.addItem(orderItem2)
    await orderRepository.update(order)

    // Assert - Then
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      rejectOnEmpty: true,
      include: [OrderItemModel],
    })

    expect(orderModel).not.toBeNull()
    expect(orderModel.items).toHaveLength(2)
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product1.id,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: product2.id,
        },
      ],
    })
  })

  it('should find an order', async () => {
    // Arrange - Given
    const orderItem = new OrderItem(
      '1',
      product1.id,
      product1.name,
      product1.price,
      2
    )
    const order = new Order('123', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    // Act - When
    const orderFound = await orderRepository.find(order.id)

    // Assert - Then
    expect(orderFound).not.toBeNull()
    expect(orderFound.items).toHaveLength(1)

    expect(orderFound).toStrictEqual(order)
  })

  it('should throw error when order not found', async () => {
    // Arrange - Given
    const orderRepository = new OrderRepository()

    // Act - When
    await expect(orderRepository.find('1')).rejects.toThrow('Order not found')
  })

  it('should find all orders', async () => {
    // Arrange - Given
    const orderRepository = new OrderRepository()

    const orderItem1 = new OrderItem(
      '1',
      product1.id,
      product1.name,
      product1.price,
      2
    )
    const order1 = new Order('123', customer.id, [orderItem1])
    await orderRepository.create(order1)

    const orderItem2 = new OrderItem(
      '2',
      product2.id,
      product2.name,
      product2.price,
      4
    )

    const order2 = new Order('124', customer.id, [orderItem2])
    await orderRepository.create(order2)

    // Act - When
    const orders = await orderRepository.findAll()

    // Assert - Then
    expect(orders).toHaveLength(2)
    expect(orders).toStrictEqual([order1, order2])
  })
})
