import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { EJobStatus } from 'src/constants/job.constant';
import { Job } from 'src/entities/job.entity';
import { GetListJobReqParam } from 'src/modules/jobs/dtos/job-request.dto';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class JobRepository extends BaseRepository<Job> {
  protected readonly alias = ETableName.JOBS;

  constructor(private readonly dataSource: DataSource) {
    super(Job, dataSource.createEntityManager());
  }

  async getAllJobs(options: GetListJobReqParam) {
    const qb = this.createQb();
    qb.leftJoinAndSelect(`${this.alias}.jobTags`, 'jobTags')
      .leftJoinAndSelect(`jobTags.tag`, 'tag')
      .where(`${this.alias}.status = :jobStatus`, {
        jobStatus: EJobStatus.ACTIVE,
      })
      .select([
        `${this.alias}.name`,
        `${this.alias}.level`,
        `${this.alias}.salary`,
        `jobTags.id`,
        `tag.id`,
        `tag.name`,
      ]);

    this.queryBuilderWithPagination(qb, options);
    return qb.getManyAndCount();
  }
}
