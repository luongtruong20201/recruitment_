import { BadRequestException, Injectable } from '@nestjs/common';
import { EError } from 'src/constants/error.constant';
import { TagRepository } from 'src/repositories/tag.repository';
import { GetTagWithSortAndSearch } from './dtos/tag-request.dto';
import { toPagination } from 'src/shared/utils/pagination';

@Injectable()
export class TagsService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getAllTags(options: GetTagWithSortAndSearch) {
    const [tags, count] =
      await this.tagRepository.getTagsWithSortAndSearch(options);

    return toPagination(tags, count, options);
  }

  async createTag(name: string) {
    const existTag = await this.tagRepository.findOne({ where: { name } });
    if (existTag) {
      throw new BadRequestException(EError);
    }

    const tag = this.tagRepository.create({ name });
    return tag.save();
  }
}
