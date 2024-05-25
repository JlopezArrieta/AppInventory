import { Table, Model, ForeignKey } from "sequelize-typescript";
import { Compra } from "../compra.model/compra.model";
import { FacturaVenta } from "./facturaVenta.model";

@Table({
    timestamps: false,
    tableName: "facturaVentaCompras"
})

export class FacturaVentaCompra extends Model {
    @ForeignKey(() => Compra)
    compraId!: number;

    @ForeignKey(() => FacturaVenta)
    facturaVentaId!: number;
}
