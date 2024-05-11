import Product from '@/domain/product/entity/product'
import ProductInterface from '@/domain/product/entity/product.interface'
import { ProductType } from '@/domain/product/entity/product_type'
import ProductFactory from '@/domain/product/factory/product.factory'
import ProductModel from '@/infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '@/infrastructure/product/repository/sequelize/product.repository'
import { createSequelize } from '@/test/test.utils'

import { Sequelize } from 'sequelize-typescript'

describe('Product repository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = createSequelize()

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product type A', async () => {
    const productRepository: ProductRepository = new ProductRepository()
    const product: ProductInterface = ProductFactory.create(
      ProductType.A,
      'Product 1',
      100
    )

    const id = product.id

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: id } })

    expect(productModel).not.toBeNull()
    expect(productModel.toJSON()).toStrictEqual({
      id: id,
      name: 'Product 1',
      price: 100,
      type: ProductType.A,
    })
  })

  it('should create a product type B', async () => {
    const productRepository: ProductRepository = new ProductRepository()
    const product: ProductInterface = ProductFactory.create(
      ProductType.B,
      'Product 2',
      200
    )

    const id = product.id

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: id } })

    expect(productModel).not.toBeNull()
    expect(productModel.toJSON()).toStrictEqual({
      id: id,
      name: 'Product 2',
      price: 400,
      type: ProductType.B,
    })
  })

  it('should update a product type A', async () => {
    const productRepository: ProductRepository = new ProductRepository()
    const product: ProductInterface = ProductFactory.create(
      ProductType.A,
      'Product 1',
      100
    )
    const id = product.id

    await productRepository.create(product)

    product.changePrice(200)
    product.changeName('Product 1 Updated')

    await productRepository.update(product)

    const productModel = await ProductModel.findOne({ where: { id: id } })

    expect(productModel).not.toBeNull()
    expect(productModel.toJSON()).toStrictEqual({
      id: id,
      name: 'Product 1 Updated',
      price: 200,
      type: ProductType.A,
    })
  })

  it('should update a product type B', async () => {
    const productRepository: ProductRepository = new ProductRepository()
    const product: ProductInterface = ProductFactory.create(
      ProductType.B,
      'Product 2',
      200
    )
    const id = product.id

    await productRepository.create(product)

    product.changePrice(400)
    product.changeName('Product 2 Updated')

    await productRepository.update(product)

    const productModel = await ProductModel.findOne({ where: { id: id } })

    expect(productModel).not.toBeNull()
    expect(productModel.toJSON()).toStrictEqual({
      id: id,
      name: 'Product 2 Updated',
      price: 800,
      type: ProductType.B,
    })
  })

  it('should find a product', async () => {
    const productRepository: ProductRepository = new ProductRepository()
    const product: Product = new Product('1', 'Product 1', 100)
    await productRepository.create(product)

    const productFound = await productRepository.find('1')

    expect(productFound).not.toBeNull()
    expect(productFound.id).toBe('1')
    expect(productFound.name).toBe('Product 1')
    expect(productFound.price).toBe(100)
  })

  it('should throw an error when product not found', async () => {
    const productRepository: ProductRepository = new ProductRepository()

    await expect(productRepository.find('1')).rejects.toThrow(
      'Product not found'
    )
  })

  it('should find all products', async () => {
    const productRepository: ProductRepository = new ProductRepository()

    const product1: Product = new Product('1', 'Product 1', 100)
    await productRepository.create(product1)

    const product2: Product = new Product('2', 'Product 2', 200)
    await productRepository.create(product2)

    const products = [product1, product2]

    const foundProducts = await productRepository.findAll()

    expect(foundProducts).toHaveLength(2)
    expect(foundProducts[0].id).toBe('1')
    expect(foundProducts[0].name).toBe('Product 1')
    expect(foundProducts[0].price).toBe(100)
    expect(foundProducts[1].id).toBe('2')
    expect(foundProducts[1].name).toBe('Product 2')
    expect(foundProducts[1].price).toBe(200)

    expect(foundProducts).toEqual(products)
  })
})
