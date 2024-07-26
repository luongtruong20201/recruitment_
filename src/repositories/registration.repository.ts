import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { Registration } from 'src/entities/registration.entity';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class RegistrationRepository extends BaseRepository<Registration> {
  protected readonly alias = ETableName.REGISTRATIONS;

  constructor(private readonly dataSource: DataSource) {
    super(Registration, dataSource.createEntityManager());
  }
}
