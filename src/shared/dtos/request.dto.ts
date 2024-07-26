import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { EDirection } from 'src/constants/api.constant';

export class PaginationReqDto {
  @ApiProperty({ required: false })
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  limit: number;

  @ApiProperty({ required: false })
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  page: number;
}

export class PaginationWithSortReqDto extends PaginationReqDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  sortBy: string;

  @ApiProperty({ required: false })
  @IsEnum(EDirection)
  @IsOptional()
  direction: EDirection;
}

export class PaginationWithSortAndSearchReqDto extends PaginationWithSortReqDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search: string;
}
