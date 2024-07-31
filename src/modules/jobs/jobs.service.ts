import { BadRequestException, Injectable } from '@nestjs/common';
import { JobRepository } from 'src/repositories/job.repository';
import {
  CreateJobReqBody,
  GetListJobReqParam,
  UpdateJobReqBody,
} from './dtos/job-request.dto';
import { EError } from 'src/constants/error.constant';
import { EJobStatus } from 'src/constants/job.constant';
import { JobTag } from 'src/entities/job-tag.entity';
import { JobTagRepository } from 'src/repositories/job-tag.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { toPagination } from 'src/shared/utils/pagination';

@Injectable()
export class JobsService {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly jobTagRepository: JobTagRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async createJob(data: CreateJobReqBody) {
    const jobExistWithNameAndCompany = await this.jobRepository.findOneBy({
      name: data.name,
      companyId: data.companyId,
    });
    if (jobExistWithNameAndCompany) {
      throw new BadRequestException(EError.JOB_EXIST_WITH_COMPANY);
    }

    const job = this.jobRepository.create({
      name: data.name,
      level: data.level,
      address: data.address,
      salary: data.salary,
      companyId: data.companyId,
      quantity: data.quantity,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      status: EJobStatus.ACTIVE,
    });

    const jobTagArray: JobTag[] = [];
    for (const tagId of data.tagsId) {
      const tag = await this.tagRepository.findOneBy({ id: tagId });
      if (!tag) {
        throw new BadRequestException(EError.TAG_NOT_FOUND);
      }
      const jobTag = this.jobTagRepository.create({ tagId });
      jobTagArray.push(jobTag);
    }

    job.jobTags = jobTagArray;

    return await job.save();
  }

  async getAllJobs(options: GetListJobReqParam) {
    const [jobs, count] = await this.jobRepository.getAllJobs(options);
    return toPagination(jobs, count, options);
  }

  async updateJob(data: UpdateJobReqBody, id: number) {
    const existJob = await this.jobRepository.findOneBy({
      id,
      status: EJobStatus.ACTIVE,
    });

    if (!existJob) {
      throw new BadRequestException(EError.JOB_NOT_FOUND);
    }

    Object.assign(existJob, data);

    return await existJob.save();
  }
}
