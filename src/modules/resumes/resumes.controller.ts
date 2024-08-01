import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResumesService } from './resumes.service';
import { AuthUser } from 'src/shared/decorators/auth.decorator';
import { IJwtPayload } from 'src/constants/auth.constant';
import { CreateResumeReqBody } from './dtos/resume-request.dto';

@Controller('resumes')
@ApiTags('Resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  createResume(
    @Body() body: CreateResumeReqBody,
    @AuthUser() user: IJwtPayload,
  ) {
    return this.resumesService.createResume(body, user.userId);
  }
}
