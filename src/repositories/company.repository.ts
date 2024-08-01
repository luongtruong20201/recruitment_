import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constants/database,constant';
import { Company } from 'src/entities/company.entity';
import { GetListCompanyReqQuery } from 'src/modules/companies/dtos/company-request.dto';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class CompanyRepository extends BaseRepository<Company> {
  protected readonly alias = ETableName.COMPANIES;

  constructor(private readonly dataSource: DataSource) {
    super(Company, dataSource.createEntityManager());
  }

  getListCompaniesWithSortAndSearch(option: GetListCompanyReqQuery) {
    const qb = this.createQb();
    this.queryBuilderWithPagination(qb, option);
    return qb.getManyAndCount();
  }
}
