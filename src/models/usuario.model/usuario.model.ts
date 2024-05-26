import { Table, Model, Column, DataType } from "sequelize-typescript";

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
        type: DataType.INTEGER,
        allowNull: false
    })
    numDocumento!: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    direccion!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    telefono!: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "No Aplica",
    })
    correo!: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "No Aplica",
    })
    contrasena!: string

    @Column({
        type: DataType.ENUM("Empleado", "Administrador"),
        allowNull: false,
        defaultValue: "Cliente",
    })
    rol!: string
}















