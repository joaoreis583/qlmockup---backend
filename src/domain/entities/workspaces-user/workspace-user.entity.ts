import { Role } from "src/infra/database/models/workspace-user.model";

/**
 * Entidade de domínio representando um workspace no sistema.
 * Esta classe não depende de frameworks nem de ORM.
 */
export class WorkspaceUserEntity {
  id?: string;
  user_id: string;
  workspace_id: string;
  email: string;
  user_email: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Omit<WorkspaceUserEntity, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
    Object.assign(this, props);
    if (id) this.id = id;
  }
}

