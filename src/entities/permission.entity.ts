import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PermissionRole } from './permission-role.entity';
import {
  EAPIMethod,
  EPermissionStatus,
} from 'src/constants/permission.constant';

@Entity('permissions')
export class Permission extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  api: string;

  @Column()
  method: EAPIMethod;

  @Column({ default: EPermissionStatus.ACTIVE })
  status: EPermissionStatus;

  @OneToMany(
    () => PermissionRole,
    (permissionRole) => permissionRole.permission,
  )
  permissionRoles: PermissionRole[];
}
