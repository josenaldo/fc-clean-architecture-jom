import ValidatorInterface from '@/domain/@shared/validation/validator.interface'
import Customer from '@/domain/customer/entity/customer'
import CustomerYupValidator from '@/infrastructure/customer/validation/customer.yup.validator'

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator()
  }
}
