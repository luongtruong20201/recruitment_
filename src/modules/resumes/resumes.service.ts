import { BadRequestException, Injectable } from '@nestjs/common';
import { ResumeRepository } from 'src/repositories/resume.repository';
import { CreateResumeReqBody } from './dtos/resume-request.dto';
import { EError } from 'src/constants/error.constant';
import { EJobStatus } from 'src/constants/job.constant';

@Injectable()
export class ResumesService {
  constructor(private readonly resumeRepository: ResumeRepository) {}

  async createResume(data: CreateResumeReqBody, userId: number) {
    const resumeExist = await this.resumeRepository.findOne({
      where: {
        userId,
        jobId: data.jobId,
        job: { status: EJobStatus.ACTIVE },
      },
      relations: {
        job: true,
      },
    });
    if (resumeExist) {
      throw new BadRequestException(EError.RESUME_EXIST);
    }

    const resume = this.resumeRepository.create({
      jobId: data.jobId,
      userId,
      filename: data.filename,
    });

    await resume.save();
  }
}
