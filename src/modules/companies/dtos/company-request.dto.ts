import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationWithSortAndSearchReqDto } from 'src/shared/dtos/request.dto';

export class CreateCompanyReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  logo: string;
}

export class UpdateCompanyReqDto extends CreateCompanyReqDto {}

export class GetListCompanyReqQuery extends PaginationWithSortAndSearchReqDto {}
