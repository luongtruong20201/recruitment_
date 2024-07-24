import { EUserStatus } from 'src/constants/user.constant';
import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column()
  status: EUserStatus;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ name: 'role_id', nullable: true, default: null })
  roleId: number;

  @Column({ name: 'company_id', nullable: true, default: null })
  companyId: number;

  @Column({ name: 'otp_secret', nullable: true })
  otpSecret: string;

  toJSON() {
    delete this.password;
    delete this.otpSecret;

    return this;
  }
}
