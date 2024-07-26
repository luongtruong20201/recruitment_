import { Controller } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobsService: JobsService) {}
}
