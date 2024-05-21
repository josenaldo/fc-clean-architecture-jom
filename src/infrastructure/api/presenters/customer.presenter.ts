import { OutputListCustomersDto } from '@/usecase/customer/list/list.customers.dto'
import { toXML } from 'jstoxml'

export default class CustomerPresenter {
  public static listXml(dto: OutputListCustomersDto): string {
    const xmlOptions = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true,
    }

    return toXML(
      {
        customers: {
          _attrs: { totalCount: dto.totalCount },
          customer: dto.data.map((customer) => ({
            _attrs: { id: customer.id },
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zipCode: customer.address.zipCode,
              city: customer.address.city,
            },
          })),
        },
      },
      xmlOptions
    )
  }
}
