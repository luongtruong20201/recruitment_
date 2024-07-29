import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateRoleReqDto,
  GetListRolesWithSortAndSearchReqDto,
} from './dtos/role-request.dto';
import { GuardPublic } from 'src/shared/decorators/auth.decorator';

@Controller('roles')
@ApiTags('Roles')
@GuardPublic()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() body: CreateRoleReqDto) {
    return this.rolesService.createRole(body);
  }

  @Get(':id')
  getRoleById(@Param('id') id: number) {
    return this.rolesService.getRoleById(id);
  }

  @Get()
  getListRoles(@Query() options: GetListRolesWithSortAndSearchReqDto) {
    return this.rolesService.getListRoles(options);
  }
}
