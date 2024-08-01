import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateResumeReqBody {
  @ApiProperty()
  @IsNumber()
  jobId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  filename: string;
}
