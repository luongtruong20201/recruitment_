import { EResumeStatus } from 'src/constants/resume.constant';
import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Job } from './job.entity';

@Entity('resumes')
export class Resume extends CustomBaseEntity {
  @Column({ name: 'job_id' })
  jobId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  status: EResumeStatus;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.resumes)
  user: User;

  @ManyToOne(() => Job, (job) => job.resumes)
  job: Job;
}
