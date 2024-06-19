import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Carrito } from "../carrito.model/carrito.model";

@Table({
    timestamps: false,
    tableName: "usuarios"
})

export class Usuario extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nombresApellidos!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "CC",
    })
    tipoDocumento!: string

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        defaultValue: 0,
    })
    numDocumento!: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "No Aplica",
    })
    direccion!: string

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        defaultValue: 0,
    })
    telefono!: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "",
    })
    correo!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "",
    })
    contrasena!: string

    @Column({
        type: DataType.ENUM("Empleado", "Admin", "Cliente"),
        allowNull: false,
        defaultValue: "Cliente",
    })
    rol!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fechaRegistro!: String

    //Relación uno a muchos, Usuario con Carrito.
    @HasMany(() => Carrito)
    carritos!: Carrito[];
}















