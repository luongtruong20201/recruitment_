import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
