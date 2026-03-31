import { Plan } from "src/infra/database/models/user.model";

/**
 * Entidade de domínio representando um usuário do sistema.
 * Esta classe não depende de frameworks nem de ORM.
 * 
 * Ela define as regras e dados essenciais do usuário.
 */ 
export class UserEntity {
  id?: string;
  name: string;
  email: string;
  password: string;
  plan: Plan;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>, id?: string) {
    Object.assign(this, props);
    if (id) this.id = id;
  }
}
