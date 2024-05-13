import Customer from '@/domain/customer/entity/customer'
import Address from '@/domain/customer/value-object/address'
import { v4 as uuid } from 'uuid'

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuid(), name)
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name)
    customer.changeAddress(address)
    return customer
  }

  public static restore(
    id: string,
    name: string,
    active: boolean,
    rewardPoints: number,
    address: Address
  ): Customer {
    const customer = new Customer(id, name, active, rewardPoints, address)

    return customer
  }
}
