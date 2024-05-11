import Customer from '@/domain/customer/entity/customer'
import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import Address from '@/domain/customer/value-object/address'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '@/infrastructure/customer/repository/sequelize/customer.repository'
import { createSequelize } from '@/test/test.utils'
import ListCustomerUseCase from '@/usecase/customer/list/list.customers.usecase'
import { Sequelize } from 'sequelize-typescript'

describe('List customers use case unit tests', () => {
  let sequelize: Sequelize
  let customerRepository: CustomerRepositoryInterface
  let customer1: Customer
  let customer2: Customer

  beforeEach(async () => {
    sequelize = createSequelize()

    sequelize.addModels([CustomerModel])
    await sequelize.sync()

    customerRepository = new CustomerRepository()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should list the customers', async () => {
    // Arrange - Given
    customer1 = CustomerFactory.createWithAddress(
      'John Doe',
      new Address('Rua Jose Lelis Franca', '1008', '38408234', 'Uberlândia')
    )
    customerRepository.create(customer1)

    customer2 = CustomerFactory.createWithAddress(
      'Jane Doe',
      new Address('Rua Jose Lelis Franca', '1020', '38408234', 'Uberlândia')
    )
    customerRepository.create(customer2)

    const listCustomerUseCase = new ListCustomerUseCase(customerRepository)

    // Act - When
    const output = await listCustomerUseCase.execute({})

    // Assert - Then
    expect(output.customers).toBeDefined()
    expect(output.customers).toHaveLength(2)
    expect(output).toEqual({
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.address.street,
            number: customer1.address.number,
            zipCode: customer1.address.zipCode,
            city: customer1.address.city,
          },
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.address.street,
            number: customer2.address.number,
            zipCode: customer2.address.zipCode,
            city: customer2.address.city,
          },
        },
      ],
    })
  })

  it('should return a empty list when there is no customers', async () => {
    // Arrange - Given
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository)

    // Act - When
    const output = await listCustomerUseCase.execute({})

    // Assert - Then
    expect(output.customers).toBeDefined()
    expect(output.customers).toHaveLength(0)
    expect(output).toEqual({ customers: [] })
  })
})
