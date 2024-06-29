import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Producto } from "../producto.model/producto.model";
import { Detalle } from "../detalle.model/detalle.model";

@Table({
  timestamps: false,
  tableName: "inventarios"
})

export class Inventario extends Model {
  @ForeignKey(() => Producto)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  productoId!: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  referencia!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nombreProducto!: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  cantidadTotal!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  cantidadVendidas!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  cantidadDisponible!: number

  @Column({
    type: DataType.ENUM("SI", "NO"),
    allowNull: false,
    defaultValue: "SI",
  })
  disponibilidad!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fecha!: String

  //Relación uno a muchos, Inventario con Detalle.
  @HasMany(() => Detalle)
  detalles!: Detalle[];

  //Relación: Inventario pertenece a un Producto.
  @BelongsTo(() => Producto)
  producto!: Producto;
}



//productoId, referencia, nombreProducto\, cantidadTotal\, cantidadVendidas\, cantidadDisponible\, disponibilidad\, fecha\








