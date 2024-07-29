import { ERoleStatus } from 'src/constants/role.constant';
import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PermissionRole } from './permission-role.entity';
import { User } from './user.entity';

@Entity('roles')
export class Role extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  status: ERoleStatus;

  @OneToMany(() => PermissionRole, (permissionRole) => permissionRole.role, {
    cascade: true,
  })
  permissionRoles: PermissionRole[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
