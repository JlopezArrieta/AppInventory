import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "facturaVentas"
})

export class FacturaVenta extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nombreProducto!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cantidad!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  precioPorKg!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  precioTotal!: number
}














