import { Body, Controller, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserReqBody } from './dtos/user-request.dto';
import { AuthUser, GuardJwt } from 'src/shared/decorators/auth.decorator';
import { IJwtPayload } from 'src/constants/auth.constant';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth()
@GuardJwt()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put()
  updateUser(@AuthUser() user: IJwtPayload, @Body() body: UpdateUserReqBody) {
    return this.usersService.updateUser(user.userId, body);
  }
}
