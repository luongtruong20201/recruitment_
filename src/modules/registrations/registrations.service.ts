import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EError } from 'src/constants/error.constant';
import { Registration } from 'src/entities/registration.entity';
import { JobRepository } from 'src/repositories/job.repository';
import { RegistrationRepository } from 'src/repositories/registration.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { MailService } from '../mail/mail.service';

@Injectable()
export class RegistrationsService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
    private readonly tagRepository: TagRepository,
    private readonly jobRepository: JobRepository,
    private readonly mailService: MailService,
  ) {}

  async createRegistration(tagIds: number[], userId: number) {
    const arrayRegistration: Registration[] = [];
    for (const tagId of tagIds) {
      const isExist = await this.registrationRepository.findOne({
        where: { tagId, userId },
      });

      if (isExist) {
        throw new BadRequestException(EError.USER_FOLLOWED_TAG);
      }
      const registration = this.registrationRepository.create({
        tagId,
        userId,
      });

      arrayRegistration.push(registration);
    }

    await this.registrationRepository.save(arrayRegistration);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async sendEmailForSubscriber() {
    // const subscribers = await this.registrationRepository.find({
    //   where: {
    //     tag: {
    //       jobTags: {
    //         job: {
    //           startDate: MoreThanOrEqual(new Date()),
    //           status: EJobStatus.ACTIVE,
    //           company: {
    //             status: ECompanyStatus.ACTIVE,
    //           },
    //         },
    //       },
    //     },
    //   },
    //   relations: { tag: { jobTags: { job: { company: true } } } },
    //   select: {},
    // });
    const subscribers = await this.registrationRepository.getSubscriber();
    console.log('check subscribers: ', subscribers);
    return await Promise.all(
      subscribers.map((subscriber) => {
        return this.mailService.sendNewJob(subscriber.user.email);
      }),
    );
  }
}
