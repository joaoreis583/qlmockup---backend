import { Module } from "@nestjs/common";
import { AddUserToWorkspaceUseCase } from "src/application/use-cases/workspaces-user/workspace-user.usecase";
import { WorkspaceRepository } from "src/infra/database/repositories/workspace.repository";
import { WorkspaceModel } from "src/infra/database/models/workspace.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { CreateWorkspaceUserController } from "./create-workspace-user.controller";
import { UserModule } from "../users/user.module";
import { UserModel } from "src/infra/database/models/user.model";
import { UserRepository } from "src/infra/database/repositories/user.repository";
import { WorkspaceUserRepository } from "src/infra/database/repositories/workspace-user.repository";
import { WorkspaceUserModel } from "src/infra/database/models/workspace-user.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      WorkspaceModel,
      UserModel,
      WorkspaceUserModel,
    ]),
    UserModule,
  ],
  controllers: [CreateWorkspaceUserController],
  providers: [
    AddUserToWorkspaceUseCase,
    { provide: 'IWorkspaceRepository', useClass: WorkspaceRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IWorkspaceUserRepository', useClass: WorkspaceUserRepository },
  ],
  exports: ['IWorkspaceRepository', 'IUserRepository', 'IWorkspaceUserRepository'],
})
export class WorkspaceUserModule {}