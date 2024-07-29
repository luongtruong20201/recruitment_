import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EAPIMethod } from 'src/constants/permission.constant';
import { PaginationWithSortAndSearchReqDto } from 'src/shared/dtos/request.dto';

export class CreatePermissionReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  api: string;

  @ApiProperty({ enum: EAPIMethod })
  @IsEnum(EAPIMethod)
  @IsNotEmpty()
  method: EAPIMethod;
}

export class GetPermissionsWithSortAndSearch extends PaginationWithSortAndSearchReqDto {}
