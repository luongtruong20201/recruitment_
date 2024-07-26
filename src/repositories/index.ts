import { CompanyRepository } from './company.repository';
import { JobRepository } from './job.repository';
import { PermissionRoleRepository } from './permission-role.repository';
import { PermissionRepository } from './permission.repository';
import { RegistrationRepository } from './registration.repository';
import { ResumeRepository } from './resume.repository';
import { RoleRepository } from './role.repository';
import { TagRepository } from './tag.repository';
import { UserRepository } from './user.repository';

export const REPOSITORIES = [
  UserRepository,
  CompanyRepository,
  JobRepository,
  PermissionRoleRepository,
  PermissionRepository,
  RegistrationRepository,
  ResumeRepository,
  RoleRepository,
  TagRepository,
];
