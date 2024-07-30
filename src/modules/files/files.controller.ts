import {
  Controller,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GuardPublic } from 'src/shared/decorators/auth.decorator';
import { IMAGE_REGEX } from 'index';
import { EError } from 'src/constants/error.constant';

@Controller('files')
@ApiTags('Files')
@GuardPublic()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload/image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        const mimetype = file.mimetype;
        if (!IMAGE_REGEX.test(mimetype)) {
          cb(new UnprocessableEntityException(EError.FILE_TYPE_INVALID), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.upload(file.buffer);
  }
}
