import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './infra/database/models/user.model';
import { UserModule } from './presentation/controllers/users/user.module';


@Module({
  imports: [
    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'qlmockup_user',
    password: 'qlmockup_pass',
    database: 'qlmockup_db',
    models: [UserModel],
    autoLoadModels: true,
    synchronize: true,
}),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
