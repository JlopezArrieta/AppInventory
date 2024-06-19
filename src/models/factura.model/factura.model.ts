// import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
// import { Usuario } from "../usuario.model/usuario.model";

// @Table({
//   timestamps: false,
//   tableName: "facturas"
// })

// export class Factura extends Model {
//   @Column({
//     type: DataType.STRING,
//     allowNull: false
//   })
//   nombreCajero!: string

//   @Column({
//     type: DataType.DATE,
//     allowNull: false
//   })
//   fechaDeCompra!: Date

//   @Column({
//     type: DataType.ENUM("Pagada", "Pendiente", "Cancelada"),
//     allowNull: false,
//     defaultValue: "Pagada",
//   })
//   estadoDeFactura!: string

//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false
//   })
//   valorApagar!: number

//   @Column({
//     type: DataType.ENUM("Efectivo", "Bonos", "Tarjeta"),
//     allowNull: false,
//     defaultValue: "Efectivo",
//   })
//   metodoDePago!: string;

//   // Relación una Factura pertenece aun Usuario
//   @ForeignKey(() => Usuario)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false
//   })
//   usuarioId!: number;

//   @BelongsTo(() => Usuario)
//   usuario!: Usuario;

//   //Relacion muchos a muchos compra con factura.
//   //@BelongsToMany(() => Compra, () => FacturaVentaCompra)
//   //compras!: Compra[];
// }















