import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser, GuardJwt } from 'src/shared/decorators/auth.decorator';
import { CreateRegistrationReqBody } from './registration-request.dto';
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
}
