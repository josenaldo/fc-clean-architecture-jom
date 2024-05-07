import { createSequelize } from '@/domain/@shared/test/test.utils'
import Customer from '@/domain/customer/entity/customer'
import Address from '@/domain/customer/value-object/address'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '@/infrastructure/customer/repository/sequelize/customer.repository'

import { Sequelize } from 'sequelize-typescript'

describe('Customer repository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = createSequelize()

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    // Arrange
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', '123', '12345678', 'City 1')
    customer.changeAddress(address)

    // Act
    await customerRepository.create(customer)

    // Assert
    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel).not.toBeNull()
    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Customer 1',
      street: 'Street 1',
      number: '123',
      zipCode: '12345678',
      city: 'City 1',
      active: false,
      rewardPoints: 0,
    })
  })

  it('should throw an error when create a customer without Address', async () => {
    // Arrange
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer('1', 'Customer 1')

    // Act & Assert
    await expect(customerRepository.create(customer)).rejects.toThrow(
      'Address is mandatory to activate a customer'
    )
  })

  it('should update a customer', async () => {
    // Arrange
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', '123', '12345678', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    // Act
    customer.changeName('Customer 1 Updated')
    await customerRepository.update(customer)

    // Assert
    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel).not.toBeNull()
    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Customer 1 Updated',
      street: 'Street 1',
      number: '123',
      zipCode: '12345678',
      city: 'City 1',
      active: false,
      rewardPoints: 0,
    })
  })

  it('should find a customer', async () => {
    // Arrange
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', '123', '12345678', 'City 1')
    customer.changeAddress(address)

    await customerRepository.create(customer)

    // Act
    const customerFound = await customerRepository.find('1')

    // Assert
    expect(customerFound).toStrictEqual(customer)
  })

  it('should throw an error when customer not found', async () => {
    // Arrange
    const customerRepository: CustomerRepository = new CustomerRepository()

    // Act & Assert
    expect(async () => {
      await customerRepository.find('12345')
    }).rejects.toThrow('Customer not found')
  })

  it('should find all customers', async () => {
    // Arrange
    const customerRepository: CustomerRepository = new CustomerRepository()

    const customer1: Customer = new Customer('1', 'Customer 1')
    const address1 = new Address('Street 1', '123', '12345678', 'City 1')
    customer1.changeAddress(address1)

    await customerRepository.create(customer1)

    const customer2: Customer = new Customer('2', 'Customer 2')
    const address2 = new Address('Street 2', '456', '87654321', 'City 2')
    customer2.changeAddress(address2)
    await customerRepository.create(customer2)

    // Act
    const customers = await customerRepository.findAll()

    // Assert
    expect(customers).toHaveLength(2)
    expect(customers[0].id).toBe('1')
    expect(customers[0].name).toBe('Customer 1')
    expect(customers[1].id).toBe('2')
    expect(customers[1].name).toBe('Customer 2')
  })

  it('should return an empty array when there are no customers', async () => {
    // Arrange
    const customerRepository: CustomerRepository = new CustomerRepository()

    // Act
    const customers = await customerRepository.findAll()

    // Assert
    expect(customers).toHaveLength(0)
  })
})
