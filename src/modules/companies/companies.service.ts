import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanyRepository } from 'src/repositories/company.repository';
import {
  CreateCompanyReqDto,
  GetListCompanyReqQuery,
  UpdateCompanyReqDto,
} from './dtos/company-request.dto';
import { EError } from 'src/constants/error.constant';
import { toPagination } from 'src/shared/utils/pagination';
import { ECompanyStatus } from 'src/constants/company.constant';
import { EJobStatus } from 'src/constants/job.constant';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async createCompany(data: CreateCompanyReqDto) {
    const companyExistWithName = await this.companyRepository.findOneBy({
      name: data.name,
    });
    if (companyExistWithName) {
      throw new BadRequestException(EError.COMPANY_EXIST_WITH_NAME);
    }

    const company = this.companyRepository.create({
      address: data.address,
      name: data.name,
      logo: data.logo,
    });

    return await company.save();
  }

  async updateCompany(data: UpdateCompanyReqDto, id: number) {
    const companyExist = await this.companyRepository.findOne({
      where: { id, status: ECompanyStatus.ACTIVE },
    });

    if (!companyExist) {
      throw new BadRequestException(EError.COMPANY_NOT_FOUND);
    }

    companyExist.name = data.name;
    companyExist.address = data.address;
    companyExist.logo = data.logo;

    return companyExist.save();
  }

  async deleteCompany(id: number) {
    const companyExist = await this.companyRepository.findOne({
      where: { id },
    });

    if (!companyExist) {
      throw new BadRequestException(EError.COMPANY_NOT_FOUND);
    }

    return this.companyRepository.softDelete({ id });
  }

  async getListCompaniesWithSortAndSearch(data: GetListCompanyReqQuery) {
    const [companies, count] =
      await this.companyRepository.getListCompaniesWithSortAndSearch(data);
    return toPagination(companies, count, data);
  }

  async getCompanyById(id: number) {
    const company = await this.companyRepository.findOne({
      where: {
        id,
        status: ECompanyStatus.ACTIVE,
        jobs: {
          status: EJobStatus.ACTIVE,
          endDate: MoreThanOrEqual(new Date()),
        },
      },
      relations: { jobs: true },
    });

    return company;
  }
}
