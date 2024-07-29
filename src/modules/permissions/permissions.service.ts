import { BadRequestException, Injectable } from '@nestjs/common';
import { PermissionRepository } from 'src/repositories/permission.repository';
import {
  CreatePermissionReqDto,
  GetPermissionsWithSortAndSearch,
} from './dtos/permission-request.dto';
import { EPermissionStatus } from 'src/constants/permission.constant';
import { EError } from 'src/constants/error.constant';
import { toPagination } from 'src/shared/utils/pagination';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async createPermission(data: CreatePermissionReqDto) {
    const permissionExist = await this.permissionRepository.findOneBy({
      name: data.name,
      api: data.api,
      method: data.method,
      status: EPermissionStatus.ACTIVE,
    });
    if (permissionExist) {
      throw new BadRequestException(EError.PERMISSION_EXIST);
    }

    const permission = this.permissionRepository.create({
      name: data.name,
      api: data.api,
      method: data.method,
      status: EPermissionStatus.ACTIVE,
    });

    return await permission.save();
  }

  async getPermissionsWithPagination(options: GetPermissionsWithSortAndSearch) {
    const [permissions, count] =
      await this.permissionRepository.getPermissionsWithPagination(options);

    return toPagination(permissions, count, options);
  }

  async getPermissionById(id: number) {
    return await this.permissionRepository.findOne({
      where: {
        id,
        status: EPermissionStatus.ACTIVE,
      },
      select: {
        name: true,
        api: true,
        method: true,
        status: true,
      },
    });
  }

  async deletePermissionById(id: number) {
    return await this.permissionRepository.softDelete({ id });
  }
}
