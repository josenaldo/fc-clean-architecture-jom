import Customer from '@/domain/customer/entity/customer'
import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import Address from '@/domain/customer/value-object/address'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '@/infrastructure/customer/repository/sequelize/customer.repository'
import { createSequelize } from '@/test/test.utils'
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from '@/usecase/customer/find/find.customer.dto'
import { FindCustomerUseCase } from '@/usecase/customer/find/find.customer.usecase'
import { Sequelize } from 'sequelize-typescript'

describe('Find customer use case integration tests', () => {
  let sequelize: Sequelize
  let repository: CustomerRepositoryInterface
  let usecase: FindCustomerUseCase
  let customer: Customer

  beforeEach(async () => {
    sequelize = createSequelize()
    sequelize.addModels([CustomerModel])
    await sequelize.sync()

    repository = new CustomerRepository()
    usecase = new FindCustomerUseCase(repository)

    customer = CustomerFactory.createWithAddress(
      'John Doe',
      new Address('Rua Jose Lelis Franca', '1008', '38408234', 'Uberlândia')
    )

    repository.create(customer)
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a customer', async () => {
    // Arrange - Given
    const input: InputFindCustomerDto = {
      id: customer.id,
    }

    // Act - When
    const output: OutputFindCustomerDto = await usecase.execute(input)

    // Assert - Then
    const expectedOutput = {
      id: customer.id,
      name: 'John Doe',
      address: {
        street: 'Rua Jose Lelis Franca',
        number: '1008',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }
    expect(output).toStrictEqual(expectedOutput)
  })

  it('should not find a customer', () => {
    // Arrange - Given
    const input: InputFindCustomerDto = {
      id: '1234',
    }

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Customer not found')
  })
})
