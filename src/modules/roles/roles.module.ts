import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
