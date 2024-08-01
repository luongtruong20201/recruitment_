import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { EPermissionStatus } from 'src/constants/permission.constant';
import { ERoleStatus } from 'src/constants/role.constant';
import { Role } from 'src/entities/role.entity';
import { GetListRolesWithSortAndSearchReqDto } from 'src/modules/roles/dtos/role-request.dto';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  protected readonly alias = ETableName.ROLES;

  constructor(private readonly dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  getRoleWithPermissions(id: number) {
    const qb = this.createQb();
    qb.leftJoinAndSelect(`${this.alias}.permissionRoles`, 'permissionRoles')
      .leftJoinAndSelect(`permissionRoles.permission`, 'permission')
      .where(`${this.alias}.id = :id`, { id })
      .andWhere(`${this.alias}.status = :roleStatus`, {
        roleStatus: ERoleStatus.ACTIVE,
      })
      .andWhere(`permission.status = :permissionStatus`, {
        permissionStatus: EPermissionStatus.ACTIVE,
      })
      .select([
        `${this.alias}.name`,
        `${this.alias}.status`,
        `permissionRoles.id`,
        `permission.id`,
        `permission.name`,
        'permission.api',
        'permission.method',
        'permission.status',
      ]);
    return qb.getOne();
  }

  getListRoles(options: GetListRolesWithSortAndSearchReqDto) {
    const qb = this.createQb();
    qb.leftJoinAndSelect(`${this.alias}.permissionRoles`, 'permissionRoles')
      .where(`${this.alias}.status = :status`, { status: ERoleStatus.ACTIVE })
      .select([
        `${this.alias}.id`,
        `${this.alias}.name`,
        `${this.alias}.status`,
        `permissionRoles.permissionId`,
      ]);

    this.queryBuilderWithPagination(qb, options);
    return qb.getManyAndCount();
  }

  getRoleForUser() {
    const qb = this.createQb();
    qb.where(`${this.alias}.name NOT LIKE 'admin'`)
      .andWhere(`${this.alias}.status = :status`, {
        status: ERoleStatus.ACTIVE,
      })
      .select([`${this.alias}.id`, `${this.alias}.name`]);
    return qb.getMany();
  }
}
