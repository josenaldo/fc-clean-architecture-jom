import CustomerFactory from '@/domain/customer/factory/customer.factory'
import Address from '@/domain/customer/value-object/address'
import { MockRepository } from '@/test/test.utils'
import UpdateCustomerUseCase from '@/usecase/customer/update/update.customer.usecase'

describe('Test update customer use case', () => {
  const customer = CustomerFactory.createWithAddress(
    'John Doe',
    new Address('Rua Jose Lelis Franca', '1008', '38408234', 'Uberlândia')
  )

  const input = {
    id: customer.id,
    name: 'John Doe Updated',
    address: {
      street: 'Rua Updated',
      number: '1010',
      zipCode: '38408234',
      city: 'Uberlândia',
    },
  }

  it('should update a customer', () => {
    // Arrange - Given
    const customerRepository = MockRepository()
    customerRepository.find.mockReturnValue(Promise.resolve(customer))

    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    // Act - When
    const output = customerUpdateUseCase.execute(input)

    // Assert - Then
    expect(output).resolves.toEqual(input)
  })

  it('should throw an error when customer not found', () => {
    // Arrange - Given
    const customerRepository = MockRepository()
    customerRepository.find.mockReturnValue(Promise.resolve(undefined))

    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    // Act - When
    const output = customerUpdateUseCase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Customer not found')
  })

  it('should throw an error when new name is empty', () => {
    // Arrange - Given
    const customerRepository = MockRepository()
    customerRepository.find.mockReturnValue(Promise.resolve(customer))

    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    const inputEmptyName = {
      ...input,
      name: '',
    }

    // Act - When
    const output = customerUpdateUseCase.execute(inputEmptyName)

    // Assert - Then
    expect(output).rejects.toThrow('Name is required')
  })

  it('should throw an error when new address is empty', () => {
    // Arrange - Given
    const customerRepository = MockRepository()
    customerRepository.find.mockReturnValue(Promise.resolve(customer))

    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    const inputEmptyAddress = {
      ...input,
      address: {
        street: '',
        number: '',
        zipCode: '',
        city: '',
      },
    }

    // Act - When
    const output = customerUpdateUseCase.execute(inputEmptyAddress)

    // Assert - Then
    expect(output).rejects.toThrow('Address is required')
  })
})
