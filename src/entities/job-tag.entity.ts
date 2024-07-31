import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Job } from './job.entity';
import { Tag } from './tag.entity';

@Entity('job_tag')
export class JobTag extends CustomBaseEntity {
  @Column({ name: 'job_id' })
  jobId: number;

  @Column({ name: 'tag_id' })
  tagId: number;

  @ManyToOne(() => Job, (job) => job.jobTags)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => Tag, (tag) => tag.jobTags)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
