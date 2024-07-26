import { EUserStatus } from 'src/constants/user.constant';
import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { Registration } from './registration.entity';
import { Company } from './company.entity';
import { Resume } from './resume.entity';

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

  @Column({ name: 'registration_id', nullable: true, default: null })
  registrationId: number;

  @Column({ name: 'resume_id', nullable: true, default: null })
  resumeId: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Registration, (registration) => registration.user)
  registrations: Registration[];

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];

  toJSON() {
    delete this.password;
    delete this.otpSecret;

    return this;
  }
}
