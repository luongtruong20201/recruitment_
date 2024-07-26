import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationWithSortAndSearchReqDto } from 'src/shared/dtos/request.dto';

export class CreateTagReqBody {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class GetTagWithSortAndSearch extends PaginationWithSortAndSearchReqDto {}
