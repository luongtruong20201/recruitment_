import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EEnv } from 'src/constants/env.constant';

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
          entities: [],
          synchronize: true,
        };
        return options;
      },
    }),
  ],
})
export class DatabaseModule {}
