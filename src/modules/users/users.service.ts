import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { UpdateUserReqBody } from './dtos/user-request.dto';
import { EUserStatus } from 'src/constants/user.constant';
import { EError } from 'src/constants/error.constant';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser(id: number, data: UpdateUserReqBody) {
    const userExist = await this.userRepository.findOneBy({
      id,
      status: EUserStatus.ACTIVE,
    });

    if (!userExist) {
      throw new BadRequestException(EError.USER_NOT_FOUND);
    }

    Object.assign(userExist, data);

    return await userExist.save();
  }
}
