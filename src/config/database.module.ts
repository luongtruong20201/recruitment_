import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EEnv } from 'src/constants/env.constant';
import { User } from 'src/entities/user.entity';
import { REPOSITORIES } from 'src/repositories';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get<string>(EEnv.DB_HOST),
          port: configService.get<number>(EEnv.DB_PORT),
          username: configService.get<string>(EEnv.DB_USERNAME),
          password: configService.get<string>(EEnv.DB_PASSWORD),
          database: configService.get<string>(EEnv.DB_DATABASE),
          entities: [User],
          synchronize: true,
          logging: true,
        };
        return options;
      },
    }),
  ],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class DatabaseModule {}
