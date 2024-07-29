import { EJobStatus } from 'src/constants/job.constant';
import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { Resume } from './resume.entity';
import { JobTag } from './job-tag.entity';

@Entity('jobs')
export class Job extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  level: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  salary: number;

  @Column()
  quantity: number;

  @Column()
  description: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  status: EJobStatus;

  @Column({ name: 'company_id' })
  companyId: number;

  @Column({ name: 'job_tag_id', default: null })
  jobTagId: number;

  @OneToMany(() => JobTag, (jobTag) => jobTag.job)
  jobTags: JobTag[];

  @ManyToOne(() => Company, (company) => company.jobs)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Resume, (resume) => resume.job)
  resumes: Resume[];
}
