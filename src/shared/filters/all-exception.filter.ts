import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { IResponse } from 'src/constants/response.constant';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    this.logger.error(exception);
    const data: IResponse<any> = {
      data: null,
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'INTERNAL SERVER ERROR',
      timestamp: new Date(),
    };
    response.status(data.status_code).json(data);
  }
}
