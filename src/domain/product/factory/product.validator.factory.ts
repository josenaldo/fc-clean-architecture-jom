import ValidatorInterface from '@/domain/@shared/validation/validator.interface'
import Product from '@/domain/product/entity/product'
import ProductB from '@/domain/product/entity/product_b'
import ProductYupValidator from '@/infrastructure/product/validation/product.yup.validator'

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product | ProductB> {
    return new ProductYupValidator()
  }
}
