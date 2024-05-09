import CustomerFactory from '@/domain/customer/factory/customer.factory'
import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import Address from '@/domain/customer/value-object/address'
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from '@/usecase/customer/create/create.customer.dto'

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.zipCode,
      input.address.city
    )

    const customer = CustomerFactory.createWithAddress(input.name, address)

    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zipCode: customer.address.zipCode,
        city: customer.address.city,
      },
    }
  }
}
