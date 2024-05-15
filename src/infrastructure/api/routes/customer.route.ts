import CustomerRepository from '@/infrastructure/customer/repository/sequelize/customer.repository'
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from '@/usecase/customer/create/create.customer.dto'
import CreateCustomerUseCase from '@/usecase/customer/create/create.customer.usecase'
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from '@/usecase/customer/find/find.customer.dto'
import { FindCustomerUseCase } from '@/usecase/customer/find/find.customer.usecase'
import { OutputListCustomersDto } from '@/usecase/customer/list/list.customers.dto'
import ListCustomerUseCase from '@/usecase/customer/list/list.customers.usecase'
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from '@/usecase/customer/update/update.customer.dto'
import UpdateCustomerUseCase from '@/usecase/customer/update/update.customer.usecase'
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

customerRoute.get('/:id', async (req: Request, res: Response) => {
  const repository = new CustomerRepository()
  const usecase = new FindCustomerUseCase(repository)

  try {
    const input: InputFindCustomerDto = {
      id: req.params.id,
    }
    const output: OutputFindCustomerDto = await usecase.execute(input)

    return res.status(200).json(output)
  } catch (error) {
    if (error instanceof Error && error.message === 'Customer not found')
      return res.status(404).json({ message: error.message })
    return res.status(500).json({ message: error })
  }
})

customerRoute.post('/', async (req: Request, res: Response) => {
  const repository = new CustomerRepository()
  const usecase = new CreateCustomerUseCase(repository)

  try {
    const customerDto: InputCreateCustomerDto = {
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

customerRoute.put('/:id', async (req: Request, res: Response) => {
  const repository = new CustomerRepository()
  const usecaste = new UpdateCustomerUseCase(repository)

  try {
    const input: InputUpdateCustomerDto = {
      id: req.params.id,
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zipCode: req.body.address.zipCode,
        city: req.body.address.city,
      },
    }

    const output: OutputUpdateCustomerDto = await usecaste.execute(input)

    return res.status(200).json(output)
  } catch (error) {
    if (error instanceof Error && error.message === 'Customer not found') {
      return res.status(404).json({ message: error.message })
    }

    if (error instanceof TypeError) {
      return res.status(400).json({ message: 'Invalid data' })
    }

    return res.status(500).json(error)
  }
})
