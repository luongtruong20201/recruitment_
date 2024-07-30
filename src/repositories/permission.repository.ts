import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { EPermissionStatus } from 'src/constants/permission.constant';
import { ERoleStatus } from 'src/constants/role.constant';
import { Permission } from 'src/entities/permission.entity';
import { GetPermissionsWithSortAndSearch } from 'src/modules/permissions/dtos/permission-request.dto';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  protected readonly alias = ETableName.PERMISSIONS;

  constructor(private readonly dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  getPermissionsWithPagination(options: GetPermissionsWithSortAndSearch) {
    const qb = this.createQb();
    qb.where(`${this.alias}.status = :status`, {
      status: EPermissionStatus.ACTIVE,
    });
    this.queryBuilderWithPagination(qb, options);
    return qb.getManyAndCount();
  }

  getPermissionWithRole(roleId: number) {
    const qb = this.createQb();
    qb.leftJoin(`${this.alias}.permissionRoles`, 'permissionRoles')
      .leftJoin(`permissionRoles.role`, 'role')
      .where(`role.id = :id AND role.status = :roleStatus`, {
        id: roleId,
        roleStatus: ERoleStatus.ACTIVE,
      })
      .andWhere(`${this.alias}.status = :permissionStatus`, {
        permissionStatus: EPermissionStatus.ACTIVE,
      })
      .select([`${this.alias}.api`, `${this.alias}.method`]);

    return qb.getMany();
  }
}
