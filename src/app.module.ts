import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './infra/database/models/user.model';
import { UserModule } from './presentation/controllers/users/user.module';
import { WorkspaceModel } from './infra/database/models/workspace.model';
import { WorkspaceModule } from './presentation/controllers/workspaces/workspace.module';
import { WorkspaceUserModule } from './presentation/controllers/workspaces-user/workspace.module';
import { WorkspaceUserModel } from './infra/database/models/workspace-user.model';


@Module({
  imports: [
    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'qlmockup_user',
    password: 'qlmockup_pass',
    database: 'qlmockup_db',
    models: [UserModel, WorkspaceModel, WorkspaceUserModel],
    autoLoadModels: true,
    synchronize: true,
}),
    UserModule,
    WorkspaceModule,
    WorkspaceUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
