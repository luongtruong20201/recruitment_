import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { JobTag } from 'src/entities/job-tag.entity';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class JobTagRepository extends BaseRepository<JobTag> {
  protected readonly alias = ETableName.JOB_TAG;

  constructor(private readonly dataSource: DataSource) {
    super(JobTag, dataSource.createEntityManager());
  }
}
