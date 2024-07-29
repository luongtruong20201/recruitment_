import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { EPermissionStatus } from 'src/constants/permission.constant';
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
}
