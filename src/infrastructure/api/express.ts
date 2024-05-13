import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'
import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'

export const app: Express = express()
app.use(express.json())

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
