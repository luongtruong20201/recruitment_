import { EResumeStatus } from 'src/constants/resume.constant';
import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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
  filename: string;

  @ManyToOne(() => User, (user) => user.resumes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Job, (job) => job.resumes)
  @JoinColumn({ name: 'job_id' })
  job: Job;
}
