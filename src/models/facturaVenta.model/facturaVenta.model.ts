import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { Compra } from "../compra.model/compra.model";
import { FacturaVentaCompra } from "./FacturaVentaCompra.model";

@Table({
  timestamps: false,
  tableName: "facturaVentas"//
})

export class FacturaVenta extends Model {
  setCompras(compras: Compra[]) {
    throw new Error("Method not implemented.");
  }
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  fechaDeCompra!: Date

  @Column({
    type: DataType.ENUM("Activa", "No Activa"),
    allowNull: false
  })
  estadoDeFactura!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  valorApagar!: number

  // @ForeignKey(() => Compra)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false
  // })
  // compraId!: number;

  //una factura pertenece a una compra.
  // @BelongsTo(() => Compra)
  // compra!: Compra[];

  //Relacion muchos a muchos compra con factura.
  @BelongsToMany(() => Compra, () => FacturaVentaCompra)
  compras!: Compra[];
}














