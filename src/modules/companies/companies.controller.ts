import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import {
  CreateCompanyReqDto,
  GetListCompanyReqQuery,
  UpdateCompanyReqDto,
} from './dtos/company-request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GuardJwt } from 'src/shared/decorators/auth.decorator';

@Controller('companies')
@ApiTags('Companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @GuardJwt()
  getListCompany(@Query() options: GetListCompanyReqQuery) {
    return this.companiesService.getListCompaniesWithSortAndSearch(options);
  }

  @Get(':id')
  getCompanyById(@Param('id') id: number) {
    return this.companiesService.getCompanyById(id);
  }

  @Post()
  @ApiBearerAuth()
  @GuardJwt()
  createCompany(@Body() body: CreateCompanyReqDto) {
    return this.companiesService.createCompany(body);
  }

  @Put(':id')
  @ApiBearerAuth()
  @GuardJwt()
  updateCompany(@Body() body: UpdateCompanyReqDto, @Param('id') id: number) {
    return this.companiesService.updateCompany(body, id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @GuardJwt()
  deleteCompany(@Param('id') id: number) {
    return this.companiesService.deleteCompany(id);
  }
}
