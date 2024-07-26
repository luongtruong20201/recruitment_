import { Repository, SelectQueryBuilder } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { ETableName } from 'src/constants/database,constant';
import { IPagination } from 'src/constants/pagination';

export abstract class BaseRepository<
  Model extends CustomBaseEntity,
> extends Repository<Model> {
  protected readonly alias: ETableName;

  createQb() {
    return this.createQueryBuilder(this.alias);
  }

  queryBuilderWithPagination(
    queryBuilder: SelectQueryBuilder<Model>,
    options: IPagination,
  ) {
    if (options.limit) {
      queryBuilder.limit(options.limit);
    }
    if (options.page) {
      queryBuilder.skip((options.page - 1) * options.limit);
    }
    if (options.sortBy) {
      queryBuilder.orderBy(
        `${this.alias}.${options.sortBy}`,
        (options.direction as unknown as 'ASC' | 'DESC') || 'DESC',
      );
    }
    return queryBuilder;
  }
}
