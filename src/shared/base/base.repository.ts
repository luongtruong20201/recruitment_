import { Repository } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { ETableName } from 'src/constants/database,constant';

export abstract class BaseRepository<
  Model extends CustomBaseEntity,
> extends Repository<Model> {
  protected readonly alias: ETableName;

  createQb() {
    return this.createQueryBuilder(this.alias);
  }
}
