import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { Tag } from 'src/entities/tag.entity';
import { GetTagWithSortAndSearch } from 'src/modules/tags/dtos/tag-request.dto';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class TagRepository extends BaseRepository<Tag> {
  protected readonly alias = ETableName.TAGS;

  constructor(private readonly dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  getTagsWithSortAndSearch(options: GetTagWithSortAndSearch) {
    const qb = this.createQb();
    this.queryBuilderWithPagination(qb, options);

    return qb.getManyAndCount();
  }
}
