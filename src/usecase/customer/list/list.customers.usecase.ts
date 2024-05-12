import Customer from '@/domain/customer/entity/customer'
import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from '@/usecase/customer/list/list.customer.dto'

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()

    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    const customersOutput = customers.map((customer) => ({
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
      totalCount: customersOutput.length,
      data: customersOutput,
    }
  }
}
