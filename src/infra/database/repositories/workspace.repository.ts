import { Injectable } from "@nestjs/common";
import { WorkspaceEntity } from "src/domain/entities/users/user.entity";
import { IWorkspaceRepository } from "src/domain/interfaces/users/user-interface.repository";
import { Plan, WorkspaceModel } from "../models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { randomUUID } from "crypto";

@Injectable()
export class WorkspaceRepository implements IWorkspaceRepository{
    constructor(
        @InjectModel(WorkspaceModel) private readonly workspaceModel: typeof workspaceModel,
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
        
        return createdWorkspace
    }

    async findAll (
        filter?: { name?: string, email?: string }
    ): Promise<WorkspaceEntity[]> {
        return [];
    }

    async findById(id: string): Promise<WorkspaceEntity | null> {
        return null;
    }

    async update(id: string, data: Partial<UserEntity>): Promise<UserEntity | null> {
        return null;
    }

    async delete(id: string): Promise<void> {
        return;
    }
}
