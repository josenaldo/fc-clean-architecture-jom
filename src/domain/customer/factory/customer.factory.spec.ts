import Customer from '@/domain/customer/entity/customer'
import CustomerFactory from '@/domain/customer/factory/customer.factory'
import Address from '@/domain/customer/value-object/address'

describe('Customer Factory Unit Tests', () => {
  it('should create a customer', () => {
    const customer: Customer = CustomerFactory.create('John Doe')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John Doe')
    expect(customer).toBeInstanceOf(Customer)
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with address', () => {
    const address = new Address('Rua Street', '1', '12345678', 'Cidade 1')
    const customer = CustomerFactory.createWithAddress('John Doe', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John Doe')
    expect(customer).toBeInstanceOf(Customer)
    expect(customer.address).toBeDefined()
    expect(customer.address.street).toBe('Rua Street')
    expect(customer.address.number).toBe('1')
    expect(customer.address.zipCode).toBe('12345678')
    expect(customer.address.city).toBe('Cidade 1')
  })
})
