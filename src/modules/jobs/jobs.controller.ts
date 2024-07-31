import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { GuardPublic } from 'src/shared/decorators/auth.decorator';
import { CreateJobReqBody, UpdateJobReqBody } from './dtos/job-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationWithSortAndSearchReqDto } from 'src/shared/dtos/request.dto';

@Controller('jobs')
@ApiTags('Jobs')
@GuardPublic()
export class JobController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getAllJobs(@Query() options: PaginationWithSortAndSearchReqDto) {
    return this.jobsService.getAllJobs(options);
  }

  @Post()
  createJob(@Body() body: CreateJobReqBody) {
    return this.jobsService.createJob(body);
  }

  @Put(':id')
  updateJob(@Body() body: UpdateJobReqBody, @Param('id') id: number) {
    return this.jobsService.updateJob(body, id);
  }
}
