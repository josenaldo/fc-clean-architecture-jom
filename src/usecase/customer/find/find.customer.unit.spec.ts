import Customer from '@/domain/customer/entity/customer'
import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import Address from '@/domain/customer/value-object/address'
import { MockRepository } from '@/test/test.utils'
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from '@/usecase/customer/find/find.customer.dto'
import { FindCustomerUseCase } from '@/usecase/customer/find/find.customer.usecase'

describe('Find customer use case unit tests', () => {
  let repository: CustomerRepositoryInterface
  let usecase: FindCustomerUseCase
  let customer: Customer

  beforeEach(async () => {
    repository = MockRepository()
    usecase = new FindCustomerUseCase(repository)

    customer = CustomerFactory.createWithAddress(
      'John Doe',
      new Address('Rua Jose Lelis Franca', '1008', '38408234', 'Uberlândia')
    )
  })

  it('should find a customer', async () => {
    // Arrange - Given
    repository.find = jest.fn().mockResolvedValue(customer)

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

  it('should throw and error when customer not found', async () => {
    // Arrange - Given
    repository.find = jest
      .fn()
      .mockRejectedValue(new Error('Customer not found'))

    const input: InputFindCustomerDto = {
      id: '123',
    }

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Customer not found')
  })
})
