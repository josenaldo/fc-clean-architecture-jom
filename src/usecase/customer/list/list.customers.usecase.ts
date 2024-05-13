import Customer from '@/domain/customer/entity/customer'
import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import {
  InputListCustomersDto,
  OutputListCustomersDto,
} from '@/usecase/customer/list/list.customers.dto'

export default class ListCustomerUseCase {
  private repository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.repository = customerRepository
  }

  async execute(input: InputListCustomersDto): Promise<OutputListCustomersDto> {
    const customers = await this.repository.findAll()

    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomersDto {
    const results = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zipCode: customer.address.zipCode,
        city: customer.address.city,
      },
    }))

    return {
      totalCount: results.length,
      data: results,
    }
  }
}
