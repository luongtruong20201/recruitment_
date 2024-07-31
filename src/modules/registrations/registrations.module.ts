import { Module } from '@nestjs/common';
import { RegistrationController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';

@Module({
  imports: [],
  controllers: [RegistrationController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
