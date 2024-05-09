import CreateCustomerUseCase from '@/usecase/customer/create/create.customer.usecase'

describe('Test create customer usecase', () => {
  const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }

  it('should create a customer', async () => {
    // Arrange - Given
    const customerRepository = MockRepository()
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
    expect(customerRepository.create).toHaveBeenCalledTimes(1)
    expect(customerRepository.create).toHaveBeenLastCalledWith(
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
    const customerRepository = MockRepository()
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
