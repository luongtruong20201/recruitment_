import { EMethod } from 'src/constants/permission.constant';
import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PermissionRole } from './permission-role.entity';

@Entity('permissions')
export class Permission extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  api: string;

  @Column()
  method: EMethod;

  @OneToMany(
    () => PermissionRole,
    (permissionRole) => permissionRole.permission,
  )
  permissionRoles: PermissionRole[];
}
