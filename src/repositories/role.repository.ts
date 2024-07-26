import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { Role } from 'src/entities/role.entity';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  protected readonly alias = ETableName.ROLES;

  constructor(private readonly dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }
}
