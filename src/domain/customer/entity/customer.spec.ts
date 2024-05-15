/* eslint @typescript-eslint/no-unused-vars: 0 */
import NotificationError from '@/domain/@shared/notification/notification.error'
import Customer from '@/domain/customer/entity/customer'
import Address from '@/domain/customer/value-object/address'

describe('Customer unit testes', () => {
  it('should throw error when id is empty', () => {
    const f = () => {
      const customer = new Customer('', 'John Doe') // NOSONAR
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('customer: ID is required')
  })

  it('should throw error when name is empty', () => {
    const f = () => {
      const customer = new Customer('1', '') // NOSONAR
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('customer: Name is required')
  })

  it('should change name', () => {
    // Arrange - Given
    const customer = new Customer('1', 'John Doe')

    // Act - When
    customer.changeName('Jane Doe')

    // Assert - Then
    expect(customer.name).toBe('Jane Doe')
  })

  it('should throw error when change name to empty', () => {
    const customer = new Customer('1', 'John Doe')

    const f = () => {
      customer.changeName('')
    }

    expect(f).toThrow(NotificationError)
    expect(f).toThrow('customer: Name is required')
  })

  it('should activate customer', () => {
    const customer = new Customer('1', 'John Doe')
    const address = new Address(
      'Rua José Lélis França',
      '1008',
      '38408234',
      'Uberlândia'
    )

    customer.changeAddress(address)
    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  it('should throw error when activate customer without address', () => {
    expect(() => {
      const customer = new Customer('1', 'John Doe')
      customer.activate()
    }).toThrow('Address is mandatory to activate a customer')
  })

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'John Doe')
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })

  it('should start with zero reward points', () => {
    const customer = new Customer('1', 'John Doe')
    expect(customer.rewardPoints).toBe(0)
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'John Doe')
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)
  })

  it('should add reward points twice', () => {
    const customer = new Customer('1', 'John Doe')
    customer.addRewardPoints(10)
    customer.addRewardPoints(20)
    expect(customer.rewardPoints).toBe(30)
  })

  it('should throw an error when add negative reward points', () => {
    const customer = new Customer('1', 'John Doe')
    expect(() => {
      customer.addRewardPoints(-10)
    }).toThrow('Reward points must be a positive number')
  })

  it('should throw an error when add zero reward points', () => {
    const customer = new Customer('1', 'John Doe')
    expect(() => {
      customer.addRewardPoints(0)
    }).toThrow('Reward points must be a positive number')
  })

  it('should throw an error when add non finite reward points', () => {
    const customer = new Customer('1', 'John Doe')
    expect(() => {
      customer.addRewardPoints(Infinity)
    }).toThrow('Reward points must be a positive number')
  })

  it('should throw an error when add not a number reward points', () => {
    const customer = new Customer('1', 'John Doe')
    expect(() => {
      customer.addRewardPoints(NaN)
    }).toThrow('Reward points must be a positive number')
  })
})
