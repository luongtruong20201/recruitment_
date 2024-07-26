import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity('permission_role')
export class PermissionRole extends CustomBaseEntity {
  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'permission_id' })
  permissionId: number;

  @ManyToOne(() => Role, (role) => role.permissionRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.permissionRoles)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}
