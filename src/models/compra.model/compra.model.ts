//import { Table, Model, Column, DataType, BelongsToMany, ForeignKey, BelongsTo } from "sequelize-typescript";
//import { FacturaVenta } from "../factura.model/factura.model";
//import { Producto } from "../producto.model/producto.model";
//import { CompraProducto } from "./compraProducto.model";
//import { FacturaVentaCompra } from "../factura.model/FacturaCompra.model";
//import { Usuario } from "../usuario.model/usuario.model";

// @Table({
//   timestamps: false,
//   tableName: "compras"
// })

// export class Compra extends Model {
//   @Column({
//     type: DataType.FLOAT,
//     allowNull: false,
//   })
//   cantidad!: number

//   @Column({
//     type: DataType.STRING,
//     allowNull: false
//   })
//   referencia!: string

//   @Column({
//     type: DataType.STRING,
//     allowNull: false
//   })
//   nombreProducto!: string

//   @Column({
//     type: DataType.FLOAT,
//     allowNull: false
//   })
//   precioUnitario!: number

//   @Column({
//     type: DataType.FLOAT,
//     allowNull: false
//   })
//   precioTotal!: number

//Relacion muchos a muchos compra con producto.
// @BelongsToMany(() => Producto, () => CompraProducto)
// Productos!: Producto[];

//Relacion muchos a muchos compra con factura.
// @BelongsToMany(() => FacturaVenta, () => FacturaVentaCompra)
// facturaVentas!: FacturaVenta[];

// Relación una Compra pertenece aun Usuario
//   @ForeignKey(() => Usuario)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false
//   })
//   usuarioId!: number;

//   @BelongsTo(() => Usuario)
//   usuario!: Usuario;
// }


//usuarioId, productoId, cantidadAcomprar, subtotal











