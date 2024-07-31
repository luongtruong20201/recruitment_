import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateRegistrationReqBody {
  @ApiProperty({ type: [Number] })
  @IsArray()
  tagIds: number[];
}
