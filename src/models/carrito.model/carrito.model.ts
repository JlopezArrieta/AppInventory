import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "../usuario.model/usuario.model";
import { Producto } from "../producto.model/producto.model";

@Table({
  timestamps: false,
  tableName: "carritos"
})

export class Carrito extends Model {
  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usuarioId!: number

  @ForeignKey(() => Producto)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productoId!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  cantidad!: number

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  subTotal!: number

  //Relación un Carrito pertenece aun Usuario.
  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  //Relación un Carrito pertenece aun Producto.
  @BelongsTo(() => Producto)
  producto!: Producto;

}









