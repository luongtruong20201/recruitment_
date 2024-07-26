import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { Resume } from 'src/entities/resume.entity';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class ResumeRepository extends BaseRepository<Resume> {
  protected readonly alias = ETableName.RESUMES;

  constructor(private readonly dataSource: DataSource) {
    super(Resume, dataSource.createEntityManager());
  }
}
