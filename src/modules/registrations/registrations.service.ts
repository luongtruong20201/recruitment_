import { BadRequestException, Injectable } from '@nestjs/common';
import { EError } from 'src/constants/error.constant';
import { Registration } from 'src/entities/registration.entity';
import { RegistrationRepository } from 'src/repositories/registration.repository';
import { TagRepository } from 'src/repositories/tag.repository';

@Injectable()
export class RegistrationsService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
    private readonly tagRepository: TagRepository,
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
}
