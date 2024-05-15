import { ProductType } from '@/domain/product/entity/product_type'
import { app } from '@/infrastructure/api/express'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'
import { createSequelize } from '@/test/test.utils'
import { Sequelize } from 'sequelize-typescript'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent.js'

describe('Product E2E tests', () => {
  let sequelize: Sequelize
  let request: TestAgent

  beforeEach(async () => {
    sequelize = createSequelize()
    sequelize.addModels([ProductModel])
    await sequelize.sync({ force: true })

    request = supertest(app)
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should list all products', async () => {
    // Arrange - Given
    const input_a = {
      type: ProductType.A,
      name: 'Product A',
      price: 10.0,
    }
    const input_b = {
      type: ProductType.B,
      name: 'Product B',
      price: 20.0,
    }

    // Act - When
    const response1 = await request.post('/products').send(input_a)
    const response2 = await request.post('/products').send(input_b)

    // Act - When
    const listResponse = await request.get('/products').send()

    // Assert - Then
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.totalCount).toBeDefined()
    expect(listResponse.body.data).toBeDefined()

    const totalCount = listResponse.body.totalCount
    const products = listResponse.body.data
    const product1 = products[0]
    const product2 = products[1]

    expect(totalCount).toBe(2)
    expect(products).toHaveLength(2)
    expect(products).toEqual([response1.body, response2.body])
    expect(product1).toEqual(response1.body)
    expect(product2).toEqual(response2.body)
  })

  it('should return an empty list when there are no products', async () => {
    // Act - When
    const response = await request.get('/products').send()

    // Assert - Then
    expect(response.status).toBe(200)
    expect(response.body.totalCount).toBe(0)
    expect(response.body.data).toHaveLength(0)
  })

  it('should find a product by id', async () => {
    // Arrange - Given
    const requestBody = {
      type: ProductType.A,
      name: 'Product A',
      price: 10.0,
    }
    const createResponse = await request.post('/products').send(requestBody)
    const productId = createResponse.body.id

    // Act - When
    const findResponse = await request.get(`/products/${productId}`).send()

    // Assert - Then
    expect(findResponse.status).toBe(200)
    expect(findResponse.body).toEqual(createResponse.body)
  })

  it('should return 404 when finding a product that does not exists', async () => {
    // Act - When
    const response = await request.get('/products/1').send()

    // Assert - Then
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Product not found')
  })

  it('should create a product', async () => {
    // Arrange - Given
    const requestBody = {
      type: ProductType.A,
      name: 'Product A',
      price: 10.0,
    }

    // Act - When
    const response = await request.post('/products').send(requestBody)

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
    const response = await request.post('/products').send(requestBody)

    // Assert - Then
    expect(response.status).toBe(500)
  })

  it('should update a product', async () => {
    // Arrange - Given
    const requestBody = {
      type: ProductType.A,
      name: 'Product A',
      price: 10.0,
    }
    const createResponse = await request.post('/products').send(requestBody)
    const productId = createResponse.body.id

    const updateRequestBody = {
      type: ProductType.A,
      name: 'Product A Updated',
      price: 20.0,
    }

    // Act - When
    const updateResponse = await request
      .put(`/products/${productId}`)
      .send(updateRequestBody)

    // Assert - Then
    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body).toEqual({
      id: productId,
      ...updateRequestBody,
    })
  })

  it('should return 400 when updating a product with invalid data', async () => {
    // Arrange - Given
    const requestBody = {
      type: ProductType.A,
      name: 'Product A',
      price: 10.0,
    }
    const createResponse = await request.post('/products').send(requestBody)
    const productId = createResponse.body.id

    const updateRequestBody = {
      name: 'John Doe Updated',
    }

    // Act - When
    const updateResponse = await request
      .put(`/products/${productId}`)
      .send(updateRequestBody)

    // Assert - Then
    expect(updateResponse.status).toBe(400)
  })

  it('should return 404 when updating a product that does not exists', async () => {
    // Arrange - Given
    const updateRequestBody = {
      type: ProductType.A,
      name: 'Product A',
      price: 10.0,
    }

    // Act - When
    const updateResponse = await request
      .put('/products/1')
      .send(updateRequestBody)

    // Assert - Then
    expect(updateResponse.status).toBe(404)
    expect(updateResponse.body.message).toBe('Product not found')
  })
})
