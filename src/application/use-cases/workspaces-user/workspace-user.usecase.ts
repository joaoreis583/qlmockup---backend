import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateWorkspaceUserDto } from 'src/application/dtos/workspaces-user/workspace-user.dto';
import { WorkspaceEntity } from 'src/domain/entities/workspaces/workspace.entity';
import type { IWorkspaceRepository } from 'src/domain/interfaces/workspaces/workspace-interface.repository';
import type { IUserRepository } from 'src/domain/interfaces/users/user-interface.repository';
import { WorkspaceUserEntity } from 'src/domain/entities/workspaces-user/workspace-user.entity';
import type { IWorkspaceUserRepository } from 'src/domain/interfaces/workspaces-user/workspace-user-interface.repository';
import { Role } from 'src/infra/database/models/workspace-user.model';

@Injectable()
export class AddUserToWorkspaceUseCase {
  constructor(
    @Inject('IWorkspaceRepository')
    private readonly workspaceRepository: IWorkspaceRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IWorkspaceUserRepository')
    private readonly workspaceUserRepository: IWorkspaceUserRepository,
  ) {}

  async execute(dto: CreateWorkspaceUserDto) {
    const role = Role.ADMIN;
    const { user_email, email, role } = dto;

    // Encontrar o usuário pelo email
    const user = await this.userRepository.findByEmail(user_email);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado com o email fornecido.');
    }

    if (!Object.values(Role).includes(role)) {
      throw new BadRequestException('Role inválido.');
    }

    // Encontrar o workspace pelo email
    const workspace = await this.workspaceRepository.findByEmail(email);
    if (!workspace) {
      throw new BadRequestException('Workspace não encontrado com o email fornecido.');
    }

    // Verificar se o usuário já está no workspace
    const existingAssociation = await this.workspaceUserRepository.findByUserAndWorkspace(user.id!, workspace.id!);
    if (existingAssociation) {
      throw new BadRequestException('Usuário já está associado a este workspace.');
    }

    // Criar a associação
    const newWorkspaceUser = new WorkspaceUserEntity(
      {
        user_id: user.id!,
        workspace_id: workspace.id!,
        role,
        email: workspace.email!,
        user_email: user.email!,
      },
      randomUUID(),
    );

    async updateRole(userId: string, workspaceId: string, newRole: Role) {
      return this.workspaceUserRepository.updateRole(userId, workspaceId, newRole);
    }

    const createdAssociation = await this.workspaceUserRepository.create(newWorkspaceUser);

    if (createdAssociation === null) {
      throw new BadRequestException('Erro ao adicionar usuário ao workspace.');
    }

    return createdAssociation;
  }
}
