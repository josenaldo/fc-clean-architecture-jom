import { customerRoute } from '@/infrastructure/api/routes/customer.route'
import { productRoute } from '@/infrastructure/api/routes/product.route'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'
import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'

export const app: Express = express()
app.use(express.json())
app.use('/customers', customerRoute)
app.use('/products', productRoute)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })

  sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync()
}

setupDb()
