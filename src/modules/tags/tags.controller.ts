import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTagReqBody,
  GetTagWithSortAndSearch,
  UpdateTagReqBody,
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

  @Get(':id')
  getTagById(@Param('id') id: number) {
    return this.tagsService.getTagById(id);
  }

  @Post()
  createTag(@Body() body: CreateTagReqBody) {
    return this.tagsService.createTag(body.name);
  }

  @Put(':id')
  updateTagById(@Param('id') id: number, @Body() body: UpdateTagReqBody) {
    return this.tagsService.updateTag(id, body);
  }

  @Delete(':id')
  deleteTag(@Param('id') id: number) {
    return this.tagsService.deleteTag(id);
  }
}
