import ValidatorInterface from '@/domain/@shared/validation/validator.interface'
import Product from '@/domain/product/entity/product'
import ProductB from '@/domain/product/entity/product_b'
import * as yup from 'yup'

export default class ProductYupValidator
  implements ValidatorInterface<Product>
{
  validate(entity: Product | ProductB): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required('ID is required'),
        name: yup
          .string()
          .required('Name is required')
          .test(
            'only-spaces-no-allowed',
            'Name cannot consist solely of spaces',
            (value) => value && value.trim().length > 0
          ),
        price: yup
          .number()
          .typeError('Price must be a number')
          .positive('Price must be greater than zero')
          .required('Price must be a number')
          .test('is-finite', 'Price must be a finite number', Number.isFinite),
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
