import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ERoleStatus } from 'src/constants/role.constant';
import { PaginationWithSortAndSearchReqDto } from 'src/shared/dtos/request.dto';

export class CreateRoleReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ERoleStatus })
  @IsEnum(ERoleStatus)
  @IsNotEmpty()
  status: ERoleStatus;

  @ApiProperty({ type: [Number] })
  @IsArray()
  permissionIds: number[];
}

export class UpdateRoleReqDto extends CreateRoleReqDto {}

export class GetListRolesWithSortAndSearchReqDto extends PaginationWithSortAndSearchReqDto {}
