import Customer from '@/domain/customer/entity/customer'
import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import Address from '@/domain/customer/value-object/address'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '@/infrastructure/customer/repository/sequelize/customer.repository'
import { createSequelize } from '@/test/test.utils'
import { InputUpdateCustomerDto } from '@/usecase/customer/update/update.customer.dto'
import UpdateCustomerUseCase from '@/usecase/customer/update/update.customer.usecase'
import { Sequelize } from 'sequelize-typescript'

describe('Update customer use case integration tests', () => {
  let sequelize: Sequelize
  let customerRepository: CustomerRepositoryInterface
  let customer: Customer
  let input: InputUpdateCustomerDto

  beforeEach(async () => {
    sequelize = createSequelize()

    sequelize.addModels([CustomerModel])
    await sequelize.sync()

    customerRepository = new CustomerRepository()

    customer = CustomerFactory.createWithAddress(
      'John Doe',
      new Address('Rua Jose Lelis Franca', '1008', '38408234', 'Uberlândia')
    )
    await customerRepository.create(customer)

    input = {
      id: customer.id,
      name: 'John Doe Updated',
      address: {
        street: 'Rua Updated',
        number: '1010',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should update a customer', async () => {
    // Arrange - Given
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    // Act - When
    const output = customerUpdateUseCase.execute(input)

    // Assert - Then
    await expect(output).resolves.toEqual(input)
  })

  it('should throw an error when customer not found', async () => {
    // Arrange - Given
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)
    input.id = '123'
    // Act - When
    const output = customerUpdateUseCase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('Customer not found')
  })

  it('should throw an error when new name is empty', async () => {
    // Arrange - Given
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)
    input.name = ''

    // Act - When
    const output = customerUpdateUseCase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('Name is required')
  })

  it('should throw an error when street is empty', async () => {
    // Arrange - Given
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)
    input.address.street = ''

    // Act - When
    const output = customerUpdateUseCase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('Street is required')
  })

  it('should throw an error when number is empty', async () => {
    // Arrange - Given
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)
    input.address.number = ''

    // Act - When
    const output = customerUpdateUseCase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('Number is required')
  })

  it('should throw an error when zipCode is empty', async () => {
    // Arrange - Given
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)
    input.address.zipCode = ''

    // Act - When
    const output = customerUpdateUseCase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('Zip code is required')
  })

  it('should throw an error when city is empty', async () => {
    // Arrange - Given
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)
    input.address.city = ''

    // Act - When
    const output = customerUpdateUseCase.execute(input)

    // Assert - Then
    await expect(output).rejects.toThrow('City is required')
  })
})
