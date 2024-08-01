import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { EError } from 'src/constants/error.constant';
import { IMAGE_REGEX } from 'src/constants/file.constant';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    const options: MulterModuleOptions = {
      fileFilter(_, file, callback) {
        if (!IMAGE_REGEX.test(file.mimetype)) {
          return callback(
            new UnprocessableEntityException(EError.FILE_TYPE_INVALID),
            false,
          );
        } else {
          callback(null, true);
        }
      },
    };
    return options;
  }
}
