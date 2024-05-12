import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import { MockRepository } from '@/test/test.utils'
import { InputCreateCustomerDto } from '@/usecase/customer/create/create.customer.dto'
import CreateCustomerUseCase from '@/usecase/customer/create/create.customer.usecase'

describe('Create customer use case unit tests', () => {
  let repository: CustomerRepositoryInterface
  let usecase: CreateCustomerUseCase
  let input: InputCreateCustomerDto

  beforeEach(async () => {
    repository = MockRepository()
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

  it('should create a customer', async () => {
    // Arrange - Given

    // Act - When
    const output = await usecase.execute(input)

    // Assert - Then
    expect(repository.create).toHaveBeenCalledTimes(1)
    expect(repository.create).toHaveBeenLastCalledWith(
      expect.objectContaining({
        _id: expect.any(String),
        _name: 'John Doe',
        _address: expect.objectContaining({
          _street: 'Rua Jose Lelis Franca',
          _number: '1008',
          _zipCode: '38408234',
          _city: 'Uberlândia',
        }),
      })
    )
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
    expect(repository.create).toHaveBeenCalledTimes(0)
    expect(output).rejects.toThrow('Name is required')
  })
})
