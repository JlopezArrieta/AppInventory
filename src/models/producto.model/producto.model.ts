import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Carrito } from "../carrito.model/carrito.model";
import { Inventario } from "../inventario.model/inventario.model";

@Table({
  timestamps: false,
  tableName: "productos"
})

export class Producto extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nombre!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  marca!: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  precioUnitario!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  codigo!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lote!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fechaRegistro!: String

  @Column({
    type: DataType.ENUM("ACTIVO", "NO ACTIVO"),
    allowNull: false,
    defaultValue: "NO ACTIVO",
  })
  estado!: String

  //Relación uno a muchos, Producto con Carrito.
  @HasMany(() => Carrito)
  carritos!: Carrito[];

  //Relación uno a muchos, Producto con Inventario.
  @HasMany(() => Inventario)
  inventario!: Inventario[];
}














