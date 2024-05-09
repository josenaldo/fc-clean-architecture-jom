export interface InputListCustomerDto {}

type CustomerResult = {
  id: string
  name: string
  address: {
    street: string
    number: string
    zipCode: string
    city: string
  }
}
export interface OutputListCustomerDto {
  customers: CustomerResult[]
}
