import Customer from '@/domain/customer/entity/customer'
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

describe('Test find customer usecase', () => {
  let sequelize: Sequelize
  let customerRepository: CustomerRepository

  beforeEach(async () => {
    sequelize = createSequelize()

    sequelize.addModels([CustomerModel])
    await sequelize.sync()

    const customer = new Customer('123', 'John Doe')
    const address = new Address(
      'Rua Jose Lelis Franca',
      '1008',
      '38408234',
      'Uberlândia'
    )
    customer.changeAddress(address)

    customerRepository = new CustomerRepository()
    customerRepository.create(customer)
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a customer', async () => {
    // Arrange - Given
    const usecase = new FindCustomerUseCase(customerRepository)
    const input: InputFindCustomerDto = {
      id: '123',
    }
    const expectedOutput = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'Rua Jose Lelis Franca',
        number: '1008',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }

    // Act - When
    const output: OutputFindCustomerDto = await usecase.execute(input)

    // Assert - Then
    expect(output).toStrictEqual(expectedOutput)
  })

  it('should not find a customer', () => {
    // Arrange - Given
    const usecase = new FindCustomerUseCase(customerRepository)
    const input: InputFindCustomerDto = {
      id: '1234',
    }

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Customer not found')
  })
})
