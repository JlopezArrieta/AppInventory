import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Compra } from "../compra.model/compra.model";
import { Usuario } from "../usuario.model/usuario.model";
import { Detalle } from "../detalle.model/detalle.model";

@Table({
  timestamps: false,
  tableName: "facturas"
})

export class Factura extends Model {
  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  usuarioId!: number;

  @ForeignKey(() => Compra)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  compraId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  fechaEmision!: string;

  @Column({
    type: DataType.ENUM("Activa", "Cancelada"),
    allowNull: false,
    defaultValue: "Activa",
  })
  estado!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  empleadoId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombreVendedor!: string;

  //Relacion: Factura pertenece a Compra. 
  @BelongsTo(() => Compra)
  compra!: Compra;

  //Relación una Compra pertenece a un Usuario.
  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  //Relación uno a muchos, Factura con Detalle.
  @HasMany(() => Detalle)
  detalles!: Detalle[];

}















