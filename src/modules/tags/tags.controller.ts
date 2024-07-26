import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTagReqBody,
  GetTagWithSortAndSearch,
} from './dtos/tag-request.dto';
import { GuardPublic } from 'src/shared/decorators/auth.decorator';

@Controller('tags')
@ApiTags('Tags')
@GuardPublic()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getTags(@Query() options: GetTagWithSortAndSearch) {
    return this.tagsService.getAllTags(options);
  }

  @Post()
  createTag(@Body() body: CreateTagReqBody) {
    return this.tagsService.createTag(body.name);
  }
}
