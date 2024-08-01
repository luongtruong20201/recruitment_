import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { ERoleStatus } from 'src/constants/role.constant';
import { PermissionRole } from 'src/entities/permission-role.entity';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class PermissionRoleRepository extends BaseRepository<PermissionRole> {
  protected readonly alias = ETableName.PERMISSION_ROLE;

  constructor(private readonly dataSource: DataSource) {
    super(PermissionRole, dataSource.createEntityManager());
  }

  getPermissionsByRole(roleId: number) {
    const qb = this.createQb();
    qb.select(`${this.alias}.id as permission_id`)
      .leftJoin(`${this.alias}.role`, 'role')
      .where(`${this.alias}.roleId = :roleId`, {
        roleId,
      })
      .andWhere(`role.status = :status`, { status: ERoleStatus.ACTIVE });

    return qb.getRawMany<{ permission_id: number }>();
  }
}
