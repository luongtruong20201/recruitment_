import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EEnv } from 'src/constants/env.constant';
import { Company } from 'src/entities/company.entity';
import { JobTag } from 'src/entities/job-tag.entity';
import { Job } from 'src/entities/job.entity';
import { PermissionRole } from 'src/entities/permission-role.entity';
import { Permission } from 'src/entities/permission.entity';
import { Registration } from 'src/entities/registration.entity';
import { Resume } from 'src/entities/resume.entity';
import { Role } from 'src/entities/role.entity';
import { Tag } from 'src/entities/tag.entity';
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
          entities: [
            User,
            Role,
            Permission,
            PermissionRole,
            Tag,
            Job,
            Company,
            Registration,
            Resume,
            JobTag,
          ],
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
