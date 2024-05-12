import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '@/infrastructure/customer/repository/sequelize/customer.repository'
import { createSequelize } from '@/test/test.utils'
import { InputCreateCustomerDto } from '@/usecase/customer/create/create.customer.dto'
import CreateCustomerUseCase from '@/usecase/customer/create/create.customer.usecase'
import { Sequelize } from 'sequelize-typescript'

describe('Create customer use case integration tests', () => {
  let sequelize: Sequelize
  let repository: CustomerRepositoryInterface
  let usecase: CreateCustomerUseCase
  let input: InputCreateCustomerDto

  beforeEach(async () => {
    sequelize = createSequelize()
    sequelize.addModels([CustomerModel])
    await sequelize.sync()

    repository = new CustomerRepository()
    usecase = new CreateCustomerUseCase(repository)

    input = {
      name: 'John Doe',
      address: {
        street: 'Rua Jose Lelis Franca',
        number: '1008',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    // Arrange - Given

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
    input.name = ''

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Name is required')
  })
})
