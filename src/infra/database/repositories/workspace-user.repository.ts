import { Injectable } from "@nestjs/common";
import { WorkspaceUserEntity } from "src/domain/entities/workspaces-user/workspace-user.entity";
import { WorkspaceEntity } from "src/domain/entities/workspaces/workspace.entity";
import { UserEntity } from "src/domain/entities/users/user.entity";
import { IWorkspaceUserRepository } from "src/domain/interfaces/workspaces-user/workspace-user-interface.repository";
import { UserModel } from "../models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { randomUUID } from "crypto";
import { WorkspaceModel } from "../models/workspace.model";
import { WorkspaceUserModel } from "../models/workspace-user.model";

@Injectable()
export class WorkspaceUserRepository implements IWorkspaceUserRepository {
    constructor(
        @InjectModel(WorkspaceUserModel) private readonly workspaceUserModel: typeof WorkspaceUserModel,
        @InjectModel(WorkspaceModel) private readonly workspaceModel: typeof WorkspaceModel,
        @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    ) {}

    async existsById(id: string): Promise<boolean> {
        const workspace = await this.workspaceUserModel.findByPk(id);
        return !!workspace;
    }

    async create(data: WorkspaceUserEntity): Promise<WorkspaceUserEntity | null> {
        const createdWorkspace = await this.workspaceUserModel.create({
            id: data.id ?? randomUUID(),
            user_id: data.user_id,
            workspace_id: data.workspace_id,
            role: data.role,
            email: data.email,
            user_email: data.user_email,
        } as any);

        return createdWorkspace as unknown as WorkspaceUserEntity;
    }

    async findAll (
        filter?: { user_id?: string, workspace_id?: string }
    ): Promise<WorkspaceUserEntity[]> {
        const where = {
            ...(filter?.user_id ? { user_id: filter.user_id } : {}),
            ...(filter?.workspace_id ? { workspace_id: filter.workspace_id } : {}),
        };
        return this.workspaceUserModel.findAll({ where }) as unknown as Promise<WorkspaceUserEntity[]>;
    }

    async findById(id: string): Promise<WorkspaceUserEntity | null> {
        return this.workspaceUserModel.findByPk(id) as unknown as Promise<WorkspaceUserEntity | null>;
    }

    async findByWorkspace(id: string): Promise<WorkspaceEntity | null> {
        return this.workspaceModel.findOne({ where: { id: id } as any }) as unknown as Promise<WorkspaceEntity | null>;
    }

    async findByUserAndWorkspace(userId: string, workspaceId: string): Promise<WorkspaceUserEntity | null> {
        return this.workspaceUserModel.findOne({ where: { user_id: userId, workspace_id: workspaceId } }) as unknown as Promise<WorkspaceUserEntity | null>;
    }

    async findByUser(id: string): Promise<UserEntity | null> {
        const association = await this.workspaceUserModel.findOne({ where: { user_id: id }, include: [this.userModel] });
        return association ? (association as any).user : null;
    }

    async update(id: string, data: Partial<WorkspaceEntity>): Promise<WorkspaceEntity | null> {
        const existing = await this.workspaceUserModel.findByPk(id);
        if (!existing) return null;
        await existing.update(data as any);
        return existing as unknown as WorkspaceEntity;
    }

    async delete(id: string): Promise<void> {
        return;
    }
}
