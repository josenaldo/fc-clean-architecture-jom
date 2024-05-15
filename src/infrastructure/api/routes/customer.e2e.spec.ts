import { app } from '@/infrastructure/api/express'
import CustomerModel from '@/infrastructure/customer/repository/sequelize/customer.model'
import { createSequelize } from '@/test/test.utils'
import { Sequelize } from 'sequelize-typescript'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent.js'

describe('Customer E2E tests', () => {
  let sequelize: Sequelize
  let request: TestAgent

  beforeEach(async () => {
    sequelize = createSequelize()
    sequelize.addModels([CustomerModel])
    await sequelize.sync({ force: true })

    request = supertest(app)
  })

  afterEach(async () => {
    await sequelize.close()
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

  it('should return an empty list when there are no customers', async () => {
    // Act - When
    const response = await request.get('/customers').send()

    // Assert - Then
    expect(response.status).toBe(200)
    expect(response.body.totalCount).toBe(0)
    expect(response.body.data).toHaveLength(0)
  })

  it('should find a customer by id', async () => {
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
    const createResponse = await request.post('/customers').send(requestBody)
    const customerId = createResponse.body.id

    // Act - When
    const findResponse = await request.get(`/customers/${customerId}`).send()

    // Assert - Then
    expect(findResponse.status).toBe(200)
    expect(findResponse.body).toEqual(createResponse.body)
  })

  it('should return 404 when finding a customer that does not exists', async () => {
    // Act - When
    const response = await request.get('/customers/1').send()

    // Assert - Then
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Customer not found')
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

  it('should update a customer', async () => {
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
    const createResponse = await request.post('/customers').send(requestBody)
    const customerId = createResponse.body.id

    const updateRequestBody = {
      name: 'John Doe Updated',
      address: {
        street: 'Rua Jose Lelis Franca Updated',
        number: '1010',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }

    // Act - When
    const updateResponse = await request
      .put(`/customers/${customerId}`)
      .send(updateRequestBody)

    // Assert - Then
    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body).toEqual({
      id: customerId,
      ...updateRequestBody,
    })
  })

  it('should return 400 when updating a customer with invalid data', async () => {
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
    const createResponse = await request.post('/customers').send(requestBody)
    const customerId = createResponse.body.id

    const updateRequestBody = {
      name: 'John Doe Updated',
    }

    // Act - When
    const updateResponse = await request
      .put(`/customers/${customerId}`)
      .send(updateRequestBody)

    // Assert - Then
    expect(updateResponse.status).toBe(400)
    expect(updateResponse.body.message).toBe('Invalid data')
  })

  it('should return 404 when updating a customer that does not exists', async () => {
    // Arrange - Given
    const updateRequestBody = {
      name: 'John Doe Updated',
      address: {
        street: 'Rua Jose Lelis Franca Updated',
        number: '1010',
        zipCode: '38408234',
        city: 'Uberlândia',
      },
    }

    // Act - When
    const updateResponse = await request
      .put('/customers/1')
      .send(updateRequestBody)

    // Assert - Then
    expect(updateResponse.status).toBe(404)
    expect(updateResponse.body.message).toBe('Customer not found')
  })
})
