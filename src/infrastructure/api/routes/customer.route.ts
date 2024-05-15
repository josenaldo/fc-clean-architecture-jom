import CustomerRepository from '@/infrastructure/customer/repository/sequelize/customer.repository'
import { OutputCreateCustomerDto } from '@/usecase/customer/create/create.customer.dto'
import CreateCustomerUseCase from '@/usecase/customer/create/create.customer.usecase'
import { OutputListCustomersDto } from '@/usecase/customer/list/list.customers.dto'
import ListCustomerUseCase from '@/usecase/customer/list/list.customers.usecase'
import express, { Request, Response } from 'express'

export const customerRoute = express.Router()

customerRoute.get('/', async (req: Request, res: Response) => {
  const repository = new CustomerRepository()
  const usecase = new ListCustomerUseCase(repository)

  try {
    const output: OutputListCustomersDto = await usecase.execute({})

    return res.status(200).json(output)
  } catch (error) {
    return res.status(500).json(error)
  }
})

customerRoute.post('/', async (req: Request, res: Response) => {
  const repository = new CustomerRepository()
  const usecase = new CreateCustomerUseCase(repository)

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zipCode: req.body.address.zipCode,
        city: req.body.address.city,
      },
    }

    const output: OutputCreateCustomerDto = await usecase.execute(customerDto)

    return res.status(201).json(output)
  } catch (error) {
    return res.status(500).json(error)
  }
})
