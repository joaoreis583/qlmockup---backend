import { Column, DataType, Table, Model } from "sequelize-typescript";

export enum Role {
  MEMBRO = 'MEMBRO',
  ADMIN = 'ADMIN',
}

@Table({
    tableName: "workspaces-user",
    timestamps: true,
})
export class WorkspaceUserModel extends Model<WorkspaceUserModel> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare user_email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare user_id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare workspace_id: string

    @Column({
        type: DataType.ENUM('MEMBRO', 'ADMIN'),
        defaultValue: Role.MEMBRO
    })
    declare role: Role
}
