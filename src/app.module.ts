import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './config/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { GuardModule } from './shared/modules/guard/guard.module';
import { FiltersModule } from './shared/modules/filters/filter.module';
import { InterceptorModule } from './shared/modules/interceptors/interceptor.module';
import { TagsModule } from './modules/tags/tags.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { FilesModule } from './modules/files/files.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { UsersModule } from './modules/users/users.module';
import { RegistrationsModule } from './modules/registrations/registrations.module';
import { ResumesModule } from './modules/resumes/resumes.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    GuardModule,
    FiltersModule,
    InterceptorModule,
    ScheduleModule.forRoot(),
    MailModule,
    AuthModule,
    TagsModule,
    CompaniesModule,
    RolesModule,
    PermissionsModule,
    FilesModule,
    JobsModule,
    UsersModule,
    RegistrationsModule,
    ResumesModule,
  ],
})
export class AppModule {}
