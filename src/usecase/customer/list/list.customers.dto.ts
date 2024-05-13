export interface InputListCustomersDto {}

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
export interface OutputListCustomersDto {
  totalCount: number
  data: CustomerResult[]
}
