import { Injectable } from "@nestjs/common";
import { WorkspaceEntity } from "src/domain/entities/workspaces/workspace.entity";
import { IWorkspaceRepository } from "src/domain/interfaces/workspaces/workspace-interface.repository";
import { UserModel } from "../models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { randomUUID } from "crypto";
import { WorkspaceModel } from "../models/workspace.model";

@Injectable()
export class WorkspaceRepository implements IWorkspaceRepository {
    constructor(
        @InjectModel(WorkspaceModel) private readonly workspaceModel: typeof WorkspaceModel,
        @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    ) {}

    async existsById(id: string): Promise<boolean> {
        const workspace = await this.workspaceModel.findByPk(id);
        return !!workspace;
    }

    async create(data: WorkspaceEntity): Promise<WorkspaceEntity | null> {
        const createdWorkspace = await this.workspaceModel.create({
            id: data.id ?? randomUUID(),
            name: data.name,
            email: data.email,
            owner_id: data.owner_id,
        } as any);

        return createdWorkspace as unknown as WorkspaceEntity;
    }

    async findAll (
        filter?: { name?: string, email?: string }
    ): Promise<WorkspaceEntity[]> {
        // Ajuste se necessário para buscar workspaces reais
        const where = {
            ...(filter?.name ? { name: filter.name } : {}),
            ...(filter?.email ? { email: filter.email } : {}),
        };
        return this.workspaceModel.findAll({ where }) as unknown as Promise<WorkspaceEntity[]>;
    }

    async findById(id: string): Promise<WorkspaceEntity | null> {
        return this.workspaceModel.findByPk(id) as unknown as Promise<WorkspaceEntity | null>;
    }

    async findByEmail(email: string): Promise<WorkspaceEntity | null> {
        return this.workspaceModel.findOne({ where: { email: email } as any }) as unknown as Promise<WorkspaceEntity | null>;
    }

    async update(id: string, data: Partial<WorkspaceEntity>): Promise<WorkspaceEntity | null> {
        const existing = await this.workspaceModel.findByPk(id);
        if (!existing) return null;
        await existing.update(data as any);
        return existing as unknown as WorkspaceEntity;
    }

    async delete(id: string): Promise<void> {
        return;
    }
}
