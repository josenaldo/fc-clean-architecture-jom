import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '@/infrastructure/customer/repository/sequelize/customer.repository'
import { createSequelize } from '@/test/test.utils'
import CreateCustomerUseCase from '@/usecase/customer/create/create.customer.usecase'
import { Sequelize } from 'sequelize-typescript'

describe('Create customer use case integration tests', () => {
  let sequelize: Sequelize
  let customerRepository: CustomerRepositoryInterface

  beforeEach(async () => {
    sequelize = createSequelize()

    sequelize.addModels([CustomerModel])
    await sequelize.sync()

    customerRepository = new CustomerRepository()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    // Arrange - Given
    const usecase = new CreateCustomerUseCase(customerRepository)
    const input = {
      name: 'John Doe',
      address: {
        street: 'Rua Jose Lelis Franca',
        number: '1008',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }

    // Act - When
    const output = await usecase.execute(input)

    // Assert - Then
    expect(output).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      address: {
        street: 'Rua Jose Lelis Franca',
        number: '1008',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    })
  })

  it('should throw an erro when name is missing', () => {
    // Arrange - Given
    const usecase = new CreateCustomerUseCase(customerRepository)
    const input = {
      name: '',
      address: {
        street: 'Rua Jose Lelis Franca',
        number: '1008',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Name is required')
  })
})
