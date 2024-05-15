import ProductRepository from '@/infrastructure/product/repository/sequelize/product.repository'
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from '@/usecase/product/create/create.product.dto'
import CreateProductUseCase from '@/usecase/product/create/create.product.usecase'
import {
  InputFindProductDto,
  OutputFindProductDto,
} from '@/usecase/product/find/find.product.dto'
import FindProductUseCase from '@/usecase/product/find/find.product.usecase'
import { OutputListProductsDto } from '@/usecase/product/list/list.product.dto'
import ListProductUseCase from '@/usecase/product/list/list.products.usecase'
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from '@/usecase/product/update/update.product.dto'
import UpdateProductUseCase from '@/usecase/product/update/update.product.usecase'
import express, { Request, Response } from 'express'

export const productRoute = express.Router()

productRoute.get('/', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecase = new ListProductUseCase(repository)

  try {
    const output: OutputListProductsDto = await usecase.execute({})

    return res.status(200).json(output)
  } catch (error) {
    return res.status(500).json(error)
  }
})

productRoute.get('/:id', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecase = new FindProductUseCase(repository)

  try {
    const input: InputFindProductDto = {
      id: req.params.id,
    }
    const output: OutputFindProductDto = await usecase.execute(input)

    return res.status(200).json(output)
  } catch (error) {
    if (error instanceof Error && error.message === 'Product not found')
      return res.status(404).json({ message: error.message })
    return res.status(500).json({ message: error })
  }
})

productRoute.post('/', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecase = new CreateProductUseCase(repository)

  try {
    const productDto: InputCreateProductDto = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    }

    const output: OutputCreateProductDto = await usecase.execute(productDto)

    return res.status(201).json(output)
  } catch (error) {
    return res.status(500).json(error)
  }
})

productRoute.put('/:id', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecaste = new UpdateProductUseCase(repository)

  try {
    const input: InputUpdateProductDto = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
    }

    const output: OutputUpdateProductDto = await usecaste.execute(input)

    return res.status(200).json(output)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ message: error.message })
      }

      return res.status(400).json({ message: error.message })
    }

    if (error instanceof TypeError) {
      return res.status(400).json({ message: 'Invalid data' })
    }

    return res.status(500).json({ message: error })
  }
})
