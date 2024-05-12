import Customer from '@/domain/customer/entity/customer'
import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import Address from '@/domain/customer/value-object/address'
import { MockRepository } from '@/test/test.utils'
import { InputUpdateCustomerDto } from '@/usecase/customer/update/update.customer.dto'
import UpdateCustomerUseCase from '@/usecase/customer/update/update.customer.usecase'

describe('Update customer use case unit tests', () => {
  let repository: CustomerRepositoryInterface
  let usecase: UpdateCustomerUseCase
  let customer: Customer
  let input: InputUpdateCustomerDto

  beforeEach(async () => {
    repository = MockRepository()
    usecase = new UpdateCustomerUseCase(repository)

    customer = CustomerFactory.createWithAddress(
      'John Doe',
      new Address('Rua Jose Lelis Franca', '1008', '38408234', 'Uberlândia')
    )

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

  it('should update a customer', () => {
    // Arrange - Given
    repository.find = jest.fn().mockReturnValue(Promise.resolve(customer))

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).resolves.toEqual(input)
  })

  it('should throw an error when customer not found', () => {
    // Arrange - Given
    repository.find = jest.fn().mockReturnValue(Promise.resolve(undefined))

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Customer not found')
  })

  it('should throw an error when new name is empty', () => {
    // Arrange - Given
    repository.find = jest.fn().mockReturnValue(Promise.resolve(customer))
    input.name = ''

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Name is required')
  })

  it('should throw an error when street is empty', () => {
    // Arrange - Given
    repository.find = jest.fn().mockReturnValue(Promise.resolve(customer))
    input.address.street = ''

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Street is required')
  })

  it('should throw an error when number is empty', () => {
    // Arrange - Given

    repository.find = jest.fn().mockReturnValue(Promise.resolve(customer))
    input.address.number = ''

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Number is required')
  })

  it('should throw an error when zipCode is empty', () => {
    // Arrange - Given

    repository.find = jest.fn().mockReturnValue(Promise.resolve(customer))
    input.address.zipCode = ''

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('Zip code is required')
  })

  it('should throw an error when city is empty', () => {
    // Arrange - Given
    repository.find = jest.fn().mockReturnValue(Promise.resolve(customer))
    input.address.city = ''

    // Act - When
    const output = usecase.execute(input)

    // Assert - Then
    expect(output).rejects.toThrow('City is required')
  })
})
