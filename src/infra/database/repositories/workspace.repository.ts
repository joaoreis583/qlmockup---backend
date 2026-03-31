import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/users/user.entity";
import { IUserRepository } from "src/domain/interfaces/users/user-interface.repository";
import { Plan, UserModel } from "../models/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { randomUUID } from "crypto";

@Injectable()
export class UserRepository implements IUserRepository{
    constructor(
        @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    ) {}
    async existsById(id: string): Promise<boolean> {
        const user = await this.userModel.findByPk(id);
        return !!user;
    }

    async create(data: UserEntity): Promise<UserEntity | null> {
        const createdUser = await this.userModel.create({
            id: data.id ?? randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            plan: data.plan,
        } as any);
        
        return createdUser
    }

    async findAll (
        filter?: { plan?: Plan; name?: string }
    ): Promise<UserEntity[]> {
        return [];
    }

    async findById(id: string): Promise<UserEntity | null> {
        return null;
    }

    async update(id: string, data: Partial<UserEntity>): Promise<UserEntity | null> {
        return null;
    }

    async delete(id: string): Promise<void> {
        return;
    }
}