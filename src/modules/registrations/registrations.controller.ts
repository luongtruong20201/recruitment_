import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AuthUser,
  GuardJwt,
  GuardPublic,
} from 'src/shared/decorators/auth.decorator';
import { CreateRegistrationReqBody } from './dtos/registration-request.dto';
import { IJwtPayload } from 'src/constants/auth.constant';

@Controller('registrations')
@ApiTags('Registrations')
export class RegistrationController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  @ApiBearerAuth()
  @GuardJwt()
  createRegistration(
    @Body() body: CreateRegistrationReqBody,
    @AuthUser() user: IJwtPayload,
  ) {
    return this.registrationsService.createRegistration(
      body.tagIds,
      user.userId,
    );
  }

  @Get()
  @GuardPublic()
  getSubscribers() {
    return this.registrationsService.sendEmailForSubscriber();
  }
}
