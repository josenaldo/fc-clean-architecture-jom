import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
  tableName: 'products',
  modelName: 'ProductModel',
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @Column({ allowNull: false })
  declare type: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare price: number
}
