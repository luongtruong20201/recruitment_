import { BadRequestException, Injectable } from '@nestjs/common';
import { EError } from 'src/constants/error.constant';
import { TagRepository } from 'src/repositories/tag.repository';
import {
  GetTagWithSortAndSearch,
  UpdateTagReqBody,
} from './dtos/tag-request.dto';
import { toPagination } from 'src/shared/utils/pagination';

@Injectable()
export class TagsService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getAllTags(options: GetTagWithSortAndSearch) {
    const [tags, count] =
      await this.tagRepository.getTagsWithSortAndSearch(options);

    return toPagination(tags, count, options);
  }

  async getTagById(id: number) {
    const tag = await this.tagRepository.findOneBy({ id });
    return tag;
  }

  async createTag(name: string) {
    const existTag = await this.tagRepository.findOne({ where: { name } });
    if (existTag) {
      throw new BadRequestException(EError.TAG_EXIST_WITH_NAME);
    }

    const tag = this.tagRepository.create({ name });
    return tag.save();
  }

  async updateTag(id: number, data: UpdateTagReqBody) {
    const existTag = await this.tagRepository.findOneBy({ id });
    if (!existTag) {
      throw new BadRequestException(EError.TAG_NOT_FOUND);
    }

    existTag.name = data.name;

    return existTag.save();
  }

  async deleteTag(id: number) {
    const tag = await this.tagRepository.findOneBy({ id });
    if (!tag) {
      throw new BadRequestException(EError.TAG_NOT_FOUND);
    }

    return await this.tagRepository.softDelete({ id });
  }
}
