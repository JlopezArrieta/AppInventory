import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Factura } from "../factura.model/factura.model";

@Table({
  timestamps: false,
  tableName: "detalles"
})

export class Detalle extends Model {
  @ForeignKey(() => Factura)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  facturaId!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  cantidad!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  producto!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  precioUnitario!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  valorTotal!: number;

  //Relación Detalle pertenece a una Factura.
  @BelongsTo(() => Factura)
  factura!: Factura;
}































