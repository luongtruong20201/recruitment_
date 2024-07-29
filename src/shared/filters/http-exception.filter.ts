import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { IResponse } from 'src/constants/response.constant';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const exceptionResponse = exception.getResponse();
    this.logger.error(JSON.stringify(exceptionResponse, null, 4));
    const data: IResponse<any> = {
      status_code: exceptionResponse.statusCode,
      data: null,
      metadata: null,
      message: exceptionResponse.message,
      timestamp: new Date(),
    };
    response.status(exceptionResponse.statusCode).json(data);
  }
}
