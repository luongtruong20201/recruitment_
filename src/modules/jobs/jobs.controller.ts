import { Body, Controller, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { GuardPublic } from 'src/shared/decorators/auth.decorator';
import { CreateJobReqBody } from './dtos/job-request.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('jobs')
@ApiTags('Jobs')
@GuardPublic()
export class JobController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  createJob(@Body() body: CreateJobReqBody) {
    return this.jobsService.createJob(body);
  }
}
