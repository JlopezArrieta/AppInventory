import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "../usuario.model/usuario.model";

@Table({
  timestamps: false,
  tableName: "compras"
})

export class Compra extends Model {
  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  usuarioId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fechaCompra!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,    //usuarioId, fechaCompra, valorTotal
  })
  valorTotal!: number;

  //Relación una Compra pertenece aun Usuario
  @BelongsTo(() => Usuario)
  usuario!: Usuario;
}















