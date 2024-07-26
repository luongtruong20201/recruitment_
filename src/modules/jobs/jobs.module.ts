import { Module } from '@nestjs/common';
import { JobController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [],
  controllers: [JobController],
  providers: [JobsService],
})
export class CompaniesModule {}
