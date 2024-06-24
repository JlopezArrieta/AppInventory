import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Factura } from "../factura.model/factura.model";

@Table({
  timestamps: false,
  tableName: "compras"
})

export class Compra extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fechaCompra!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  valorTotal!: number;

  @Column({
    type: DataType.ENUM("Activa", "Cancelada"),
    allowNull: false,
    defaultValue: "Activa",
  })
  estado!: string;

  @Column({
    type: DataType.ENUM("Efectivo", "Targeta"),
    allowNull: false,
    defaultValue: "Efectivo",
  })
  metodoDePago!: string;

  //Relación una Compra tiene una Factura
  @HasOne(() => Factura)
  factura!: Factura;
}





















