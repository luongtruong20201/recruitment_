import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/repositories/role.repository';
import {
  CreateRoleReqDto,
  GetListRolesWithSortAndSearchReqDto,
} from './dtos/role-request.dto';
import { EError } from 'src/constants/error.constant';
import { PermissionRepository } from 'src/repositories/permission.repository';
import { EPermissionStatus } from 'src/constants/permission.constant';
import { PermissionRoleRepository } from 'src/repositories/permission-role.repository';
import { PermissionRole } from 'src/entities/permission-role.entity';
import { toPagination } from 'src/shared/utils/pagination';

@Injectable()
export class RolesService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly permissionRoleRepository: PermissionRoleRepository,
  ) {}

  async createRole(data: CreateRoleReqDto) {
    console.log('check data: ', data);
    const roleExistWithName = await this.roleRepository.findOneBy({
      name: data.name,
    });

    if (roleExistWithName) {
      throw new BadRequestException(EError.ROLE_EXIST_WITH_NAME);
    }

    const role = this.roleRepository.create({
      name: data.name,
      status: data.status,
    });
    const arrayPerrmissionRole: PermissionRole[] = [];
    for (const permissionId of data.permissionIds) {
      const permission = await this.permissionRepository.findOneBy({
        id: permissionId,
        status: EPermissionStatus.ACTIVE,
      });
      if (!permission) {
        throw new BadRequestException(EError.PERMISSION_NOT_FOUND);
      }

      const permissionRole = this.permissionRoleRepository.create({
        permissionId: permissionId,
      });

      arrayPerrmissionRole.push(permissionRole);
    }
    role.permissionRoles = arrayPerrmissionRole;
    return await role.save();
  }

  async getRoleById(id: number) {
    const roleWithPermissions =
      await this.roleRepository.getRoleWithPermissions(id);
    if (!roleWithPermissions) {
      throw new BadRequestException(EError.ROLE_NOT_FOUND);
    }
    return roleWithPermissions;
  }

  async getListRoles(options: GetListRolesWithSortAndSearchReqDto) {
    const [roles, count] = await this.roleRepository.getListRoles(options);
    return toPagination(roles, count, options);
  }
}
