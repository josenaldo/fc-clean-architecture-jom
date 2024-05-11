import Customer from '@/domain/customer/entity/customer'
import Address from '@/domain/customer/value-object/address'
import { MockRepository } from '@/test/test.utils'
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from '@/usecase/customer/find/find.customer.dto'
import { FindCustomerUseCase } from '@/usecase/customer/find/find.customer.usecase'

describe('Find customer use case unit tests', () => {
  let customer: Customer

  beforeEach(async () => {
    customer = new Customer('123', 'John Doe')
    const address = new Address(
      'Rua Jose Lelis Franca',
      '1008',
      '38408234',
      'Uberlândia'
    )
    customer.changeAddress(address)
  })

  afterEach(async () => {})

  it('should find a customer', async () => {
    // Arrange - Given
    const customerRepository = MockRepository()
    customerRepository.find = jest.fn().mockResolvedValue(customer)
    const usecase = new FindCustomerUseCase(customerRepository)

    const input: InputFindCustomerDto = {
      id: '123',
    }

    // Act - When
    const output: OutputFindCustomerDto = await usecase.execute(input)

    // Assert - Then
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
    expect(output).toStrictEqual(expectedOutput)
  })

  it('should throw and error when customer not found', async () => {
    // Arrange - Given
    const customerRepository = MockRepository()
    customerRepository.find = jest
      .fn()
      .mockRejectedValue(new Error('Customer not found'))
    const usecase = new FindCustomerUseCase(customerRepository)

    const input: InputFindCustomerDto = {
      id: '123',
    }

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Customer not found')
  })
})
