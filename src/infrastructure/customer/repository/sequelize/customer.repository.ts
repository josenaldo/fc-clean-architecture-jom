import Customer from '@/domain/customer/entity/customer'
import CustomerRepositoryInterface from '@/domain/customer/repository/customer_repository.interface'
import Address from '@/domain/customer/value-object/address'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    if (customer.address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }

    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zipCode: customer.address.zipCode,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    })
  }

  async update(customer: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: customer.name,
        street: customer.address.street,
        number: customer.address.number,
        zipCode: customer.address.zipCode,
        city: customer.address.city,
        active: customer.isActive(),
        rewardPoints: customer.rewardPoints,
      },
      {
        where: { id: customer.id },
      }
    )
  }

  async find(id: string): Promise<Customer> {
    let model
    try {
      model = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      })
    } catch (error) {
      throw new Error('Customer not found')
    }

    return this.modelToEntity(model)
  }

  async findAll(): Promise<Customer[]> {
    const models = await CustomerModel.findAll()

    return models.map((model) => {
      return this.modelToEntity(model)
    })
  }

  private modelToEntity(model: CustomerModel): Customer {
    const customer = new Customer(model.id, model.name)

    const address = new Address(
      model.street,
      model.number,
      model.zipCode,
      model.city
    )
    customer.changeAddress(address)

    if (model.active) {
      customer.activate()
    }

    return customer
  }
}
