import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { EJobStatus } from 'src/constants/job.constant';
import { PaginationWithSortAndSearchReqDto } from 'src/shared/dtos/request.dto';

export class CreateJobReqBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  salary: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(1)
  companyId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  startDate: number;

  @ApiProperty()
  @IsNumber()
  endDate: number;

  @ApiProperty({ enum: EJobStatus })
  @IsEnum(EJobStatus)
  @IsNotEmpty()
  status: EJobStatus;

  @ApiPropertyOptional({ type: [Number] })
  @IsArray()
  @IsOptional()
  tagsId?: number[];
}

export class UpdateJobReqBody extends CreateJobReqBody {}

export class GetListJobReqParam extends PaginationWithSortAndSearchReqDto {}
