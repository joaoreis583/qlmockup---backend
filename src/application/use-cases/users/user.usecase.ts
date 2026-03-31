import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateWorkspaceDto } from 'src/application/dtos/workspaces/workspace.dto';
import { WorkspaceEntity } from 'src/domain/entities/workspaces/workspace.entity';
import type { IWorkspaceRepository } from 'src/domain/interfaces/workspaces/workspace-interface.repository';

@Injectable()
export class CreateWorkspaceUseCase {
  constructor(
    @Inject('IWorkspaceRepository')
    private readonly workspaceRepository: IWorkspaceRepository
  ) {}

  async execute(dto: CreateWorkspaceDto) {
    const { id, name, owner_id } = dto;

    const idAlreadyExists = await this.workspaceRepository.findById(id);

    if (idAlreadyExists) {
      throw new BadRequestException('There is already a user registered with this ID.');
    }

    const newWorkspace = new WorkspaceEntity(
      {
        name,
        owner_id
      },
      randomUUID(),
    );

    const createdWorkspace = await this.userRepository.create(newWorkspace);

    if (createdWorkspace === null) {
      throw new BadRequestException('Error creating workspace');
    }
    return createdWorkspace;
  }
}