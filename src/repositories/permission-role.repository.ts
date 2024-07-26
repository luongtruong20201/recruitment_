import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { PermissionRole } from 'src/entities/permission-role.entity';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class PermissionRoleRepository extends BaseRepository<PermissionRole> {
  protected readonly alias = ETableName.PERMISSION_ROLE;

  constructor(private readonly dataSource: DataSource) {
    super(PermissionRole, dataSource.createEntityManager());
  }
}
