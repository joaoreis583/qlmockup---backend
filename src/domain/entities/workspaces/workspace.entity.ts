
/**
 * Entidade de domínio representando um workspace no sistema.
 * Esta classe não depende de frameworks nem de ORM.
 */
export class WorkspaceEntity {
  id?: string;
  name: string;
  email?: string;
  owner_id: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Omit<WorkspaceEntity, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
    Object.assign(this, props);
    if (id) this.id = id;
  }
}

