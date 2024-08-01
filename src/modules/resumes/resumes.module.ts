import { Module } from '@nestjs/common';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';

@Module({
  imports: [],
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule {}
