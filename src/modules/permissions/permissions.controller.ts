import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreatePermissionReqDto,
  GetPermissionsWithSortAndSearch,
} from './dtos/permission-request.dto';
import { GuardPublic } from 'src/shared/decorators/auth.decorator';

@Controller('permissions')
@ApiTags('Permissions')
@GuardPublic()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  createPermission(@Body() body: CreatePermissionReqDto) {
    return this.permissionsService.createPermission(body);
  }

  @Get()
  getPermissionsWithPagination(
    @Query() options: GetPermissionsWithSortAndSearch,
  ) {
    return this.permissionsService.getPermissionsWithPagination(options);
  }

  @Get(':id')
  getPermissionById(@Param('id') id: number) {
    return this.permissionsService.getPermissionById(id);
  }

  @Delete(':id')
  deletePermissionById(@Param('id') id: number) {
    return this.permissionsService.deletePermissionById(id);
  }
}
