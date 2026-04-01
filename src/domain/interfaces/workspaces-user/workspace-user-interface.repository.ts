import { WorkspaceEntity } from '../../entities/workspaces/workspace.entity';
import { WorkspaceUserEntity } from '../../entities/workspaces-user/workspace-user.entity';
import { UserEntity } from '../../entities/users/user.entity';

export interface IWorkspaceUserRepository {
  create(workspaceUser: WorkspaceUserEntity): Promise<WorkspaceUserEntity | null>;
  findAll(filter?: { user_id?: string; workspace_id?: string }): Promise<WorkspaceUserEntity[]>;
  findByWorkspace(id: string): Promise<WorkspaceEntity | null>;
  findByUser(id: string): Promise<UserEntity | null>;
  findByUserAndWorkspace(userId: string, workspaceId: string): Promise<WorkspaceUserEntity | null>;
  update(id: string, data: Partial<WorkspaceEntity>): Promise<WorkspaceEntity | null>;
  delete(id: string): Promise<void>;
  existsById(id: string): Promise<boolean>;
}
