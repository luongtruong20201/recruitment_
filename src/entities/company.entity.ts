import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Job } from './job.entity';
import { User } from './user.entity';

@Entity('companies')
export class Company extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  logo: string;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];

  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
