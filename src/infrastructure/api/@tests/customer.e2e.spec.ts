import { app } from '@/infrastructure/api/express'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'
import { createSequelize } from '@/test/test.utils'
import { Sequelize } from 'sequelize-typescript'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent.js'

describe('Customer E2E tests', () => {
  let sequelize: Sequelize
  let request: TestAgent

  beforeEach(async () => {
    sequelize = createSequelize()
    sequelize.addModels([CustomerModel, ProductModel])
    await sequelize.sync({ force: true })

    request = supertest(app)
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    // Arrange - Given
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
    const requestBody = {
      name: 'John Doe',
    }

    // Act - When
    const response = await request.post('/customers').send(requestBody)

    // Assert - Then
    expect(response.status).toBe(500)
  })

  it('should list all customers', async () => {
    // Arrange - Given
    const input1 = {
      name: 'John Doe',
      address: {
        street: 'Rua Jose Lelis Franca',
        number: '1008',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }
    const input2 = {
      name: 'Jane Doe',
      address: {
        street: 'Rua Jose Lelis Franca',
        number: '1010',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }

    // Act - When
    const response1 = await request.post('/customers').send(input1)
    const response2 = await request.post('/customers').send(input2)

    // Act - When
    const listResponse = await request.get('/customers').send()

    // Assert - Then
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.totalCount).toBeDefined()
    expect(listResponse.body.data).toBeDefined()

    const totalCount = listResponse.body.totalCount
    const customers = listResponse.body.data
    const customer1 = customers[0]
    const customer2 = customers[1]

    expect(totalCount).toBe(2)
    expect(customers).toHaveLength(2)
    expect(customers).toEqual([response1.body, response2.body])
    expect(customer1).toEqual(response1.body)
    expect(customer2).toEqual(response2.body)
  })
})
