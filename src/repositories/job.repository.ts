import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { Job } from 'src/entities/job.entity';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class JobRepository extends BaseRepository<Job> {
  protected readonly alias = ETableName.JOBS;

  constructor(private readonly dataSource: DataSource) {
    super(Job, dataSource.createEntityManager());
  }
}
