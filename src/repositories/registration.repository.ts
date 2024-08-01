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

  getSubscriber() {
    const qb = this.createQb();
    qb.leftJoinAndSelect(`${this.alias}.user`, 'user')
      .leftJoinAndSelect(`${this.alias}.tag`, 'tag')
      .leftJoinAndSelect(`tag.jobTags`, 'jobTag')
      .leftJoinAndSelect(`jobTag.job`, 'job')
      .leftJoinAndSelect(`job.company`, 'company')
      .select([
        `company.name`,
        `job.name`,
        `job.level`,
        'job.salary',
        'job.quantity',
        'job.startDate',
        'job.endDate',
        'user.name',
        'user.email',
        `${this.alias}.id`,
        'tag.name',
        'jobTag.id',
      ])
      .where(`job.startDate >= :date`, { date: Date.now() / 1000 });
    return qb.getMany();
  }
}
