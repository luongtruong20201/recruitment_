import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { EJobStatus } from 'src/constants/job.constant';

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
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ enum: EJobStatus })
  @IsEnum(EJobStatus)
  @IsNotEmpty()
  status: EJobStatus;

  @ApiPropertyOptional({ type: [Number] })
  @IsArray()
  @IsOptional()
  tagsId?: number[];
}
