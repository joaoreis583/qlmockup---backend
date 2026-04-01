import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateWorkspaceDto } from 'src/application/dtos/workspaces/workspace.dto';
import { WorkspaceEntity } from 'src/domain/entities/workspaces/workspace.entity';
import type { IWorkspaceRepository } from 'src/domain/interfaces/workspaces/workspace-interface.repository';
import type { IUserRepository } from 'src/domain/interfaces/users/user-interface.repository';

@Injectable()
export class CreateWorkspaceUseCase {
  constructor(
    @Inject('IWorkspaceRepository')
    private readonly workspaceRepository: IWorkspaceRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateWorkspaceDto) {
    const { id, name, email, owner_id } = dto;

    if (id) {
      const idAlreadyExists = await this.workspaceRepository.findById(id);
      if (idAlreadyExists) {
        throw new BadRequestException('Já existe um workspace cadastrado com esse ID.');
      }
    }

    const emailAlreadyExists = await this.workspaceRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new BadRequestException('Já existe um workspace cadastrado com esse email.');
    }

    const existingUser = await this.userRepository.findByEmail(email);
    const resolvedOwnerId = existingUser ? existingUser.id : owner_id;

    const user = existingUser ?? await this.userRepository.findById(owner_id);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if(user.plan === "FREE") {
      throw new BadRequestException('Seu plano é muito baixo para criar uma empresa. Atualize ele!');
    }

    if (!resolvedOwnerId) {
      throw new BadRequestException('Owner ID não informado e email não vinculado a usuário existente.');
    }

    const newWorkspace = new WorkspaceEntity(
      {
        name,
        email,
        owner_id: resolvedOwnerId,
      },
      randomUUID(),
    );
    
    const createdWorkspace = await this.workspaceRepository.create(newWorkspace);

    if (createdWorkspace === null) {
      throw new BadRequestException('Error creating workspace');
    }
    return createdWorkspace;
  }
}