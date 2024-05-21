import ValidatorInterface from '@/domain/@shared/validation/validator.interface'
import Customer from '@/domain/customer/entity/customer'
import * as yup from 'yup'

export default class CustomerYupValidator
  implements ValidatorInterface<Customer>
{
  validate(entity: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required('ID is required'),
        name: yup.string().required('Name is required'),
      })

      schema.validateSync(entity, { abortEarly: false })
    } catch (errors) {
      const e = errors as yup.ValidationError

      e.errors.forEach((error) => {
        entity.addNotificationError(error)
      })

      entity.throwIfHasNotificationErrors()
    }
  }
}
