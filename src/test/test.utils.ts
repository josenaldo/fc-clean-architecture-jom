import { Sequelize } from 'sequelize-typescript'

export function createSequelize(): Sequelize {
  return new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    sync: {
      force: true,
    },
  })
}

export const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  }
}
