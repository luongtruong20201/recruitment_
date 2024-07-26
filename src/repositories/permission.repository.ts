import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { Permission } from 'src/entities/permission.entity';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  protected readonly alias = ETableName.PERMISSIONS;

  constructor(private readonly dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }
}
