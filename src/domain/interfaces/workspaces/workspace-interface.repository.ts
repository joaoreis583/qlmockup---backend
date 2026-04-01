import { WorkspaceEntity } from '../../entities/workspaces/workspace.entity';

export interface IWorkspaceRepository {
  create(workspace: WorkspaceEntity): Promise<WorkspaceEntity | null>;
  findAll(filter?: { name?: string; email?: string }): Promise<WorkspaceEntity[]>;
  findById(id: string): Promise<WorkspaceEntity | null>;
  findByEmail(email: string): Promise<WorkspaceEntity | null>;
  update(id: string, data: Partial<WorkspaceEntity>): Promise<WorkspaceEntity | null>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
}
