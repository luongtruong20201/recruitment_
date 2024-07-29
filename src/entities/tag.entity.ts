import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Registration } from './registration.entity';
import { JobTag } from './job-tag.entity';

@Entity('tags')
export class Tag extends CustomBaseEntity {
  @Column()
  name: string;

  @Column({ name: 'job_tag_id', default: null, nullable: true })
  jobTagId: number;

  @OneToMany(() => JobTag, (jobTag) => jobTag.tag)
  jobTags: JobTag[];

  @OneToMany(() => Registration, (registration) => registration.tag)
  registrations: Registration[];
}
