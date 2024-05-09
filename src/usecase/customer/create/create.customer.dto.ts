export interface InputCreateCustomerDto {
  name: string
  address: {
    street: string
    number: string
    zipCode: string
    city: string
  }
}

export interface OutputCreateCustomerDto {
  id: string
  name: string
  address: {
    street: string
    number: string
    zipCode: string
    city: string
  }
}
