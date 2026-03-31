import { UserEntity } from '../../entities/users/user.entity';


export interface IUserRepository {
  /**
   * Cria um novo usuário no banco.
   * Retorna o usuário criado com ID.
   */
  create(server: UserEntity): Promise<UserEntity | null>;

  /**
   * Busca todos os servers com filtro opcional (ex: por role ou nome).
   */
  findAll(filter?: { name?: string }): Promise<UserEntity[]>;

  /**
   * Busca uma compra pelo ID.
   */
  findById(id: string): Promise<UserEntity | null>;

  /**
   * Atualiza um usuário existente.
   */
  update(id: string, data: Partial<UserEntity>): Promise<UserEntity | null>;

  /**
   * Deleta (ou desativa) um usuário pelo ID.
   */
  delete(id: string): Promise<void>;
  
  existsById(id: string): Promise<boolean>;
}
