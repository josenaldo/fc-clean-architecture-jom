import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import Address from '@/domain/customer/value-object/address'
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from '@/usecase/customer/update/update.customer.dto'

export default class UpdateCustomerUseCase {
  private repository: CustomerRepositoryInterface

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository
  }

  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.repository.find(input.id)

    if (!customer) {
      throw new Error('Customer not found')
    }

    customer.changeName(input.name)

    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.zipCode,
      input.address.city
    )
    customer.changeAddress(address)

    await this.repository.update(customer)

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
