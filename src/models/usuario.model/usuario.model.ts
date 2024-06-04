import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { FacturaVenta } from "../facturaVenta.model/facturaVenta.model";

@Table({
    timestamps: false,
    tableName: "usuarios"
})

export class Usuario extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nombres!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "CC",
    })
    tipoDocumento!: string

    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    numDocumento!: number

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: "No Aplica",
    })
    direccion!: string

    @Column({
        type: DataType.BIGINT,
        allowNull: true,
        defaultValue: "No Aplica",
    })
    telefono!: number

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: "No Aplica",
    })
    correo!: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: "No Aplica",
    })
    contrasena!: string

    @Column({
        type: DataType.ENUM("Empleado", "Administrador", "Cliente"),
        allowNull: false,
        defaultValue: "Cliente",
    })
    rol!: string

    // Relación uno a muchos usuario con FacturaVenta
    @HasMany(() => FacturaVenta)
    facturas!: FacturaVenta[];
}















