import CustomerFactory from '@/domain/customer/factory/customer.factory'
import Address from '@/domain/customer/value-object/address'
import { MockRepository } from '@/test/test.utils'
import ListCustomerUseCase from '@/usecase/customer/list/list.customers.usecase'

describe('Test list customers use case', () => {
  const customer1 = CustomerFactory.createWithAddress(
    'John Doe',
    new Address('Rua Jose Lelis Franca', '1008', '38408234', 'Uberlândia')
  )

  const customer2 = CustomerFactory.createWithAddress(
    'Jane Doe',
    new Address('Rua Jose Lelis Franca', '1020', '38408234', 'Uberlândia')
  )

  it('should list the customers', async () => {
    // Arrange - Given
    const customerRepository = MockRepository()
    customerRepository.findAll.mockReturnValue(
      Promise.resolve([customer1, customer2])
    )

    const listCustomerUseCase = new ListCustomerUseCase(customerRepository)

    // Act - When
    const output = await listCustomerUseCase.execute({})

    // Assert - Then
    expect(output.customers).toBeDefined()
    expect(output.customers).toHaveLength(2)
    expect(output).toEqual({
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.address.street,
            number: customer1.address.number,
            zipCode: customer1.address.zipCode,
            city: customer1.address.city,
          },
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.address.street,
            number: customer2.address.number,
            zipCode: customer2.address.zipCode,
            city: customer2.address.city,
          },
        },
      ],
    })
  })
})
