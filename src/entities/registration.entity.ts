import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entity';

@Entity('registrations')
export class Registration extends CustomBaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'tag_id' })
  tagId: number;

  @ManyToOne(() => User, (user) => user.registrations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Tag, (tag) => tag.registrations)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
