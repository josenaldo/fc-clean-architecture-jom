import { app } from '@/infrastructure/api/express'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'
import { createSequelize } from '@/test/test.utils'
import { Sequelize } from 'sequelize-typescript'
import supertest from 'supertest'

describe('Customer E2E tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = createSequelize()
    sequelize.addModels([CustomerModel, ProductModel])
    await sequelize.sync({ force: true })
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    // Arrange - Given
    const request = supertest(app)
    const requestBody = {
      name: 'John Doe',
      address: {
        street: 'Rua Jose Lelis Franca',
        number: '1008',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }

    // Act - When
    const response = await request.post('/customers').send(requestBody)

    // Assert - Then
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(String),
      ...requestBody,
    })
  })

  it('should return 500 when an error occurs', async () => {
    // Arrange - Given
    const request = supertest(app)
    const requestBody = {
      name: 'John Doe',
    }

    // Act - When
    const response = await request.post('/customers').send(requestBody)

    // Assert - Then
    expect(response.status).toBe(500)
  })
})
