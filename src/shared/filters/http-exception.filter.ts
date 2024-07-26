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
    this.logger.error(exceptionResponse);

    response
      .status(exceptionResponse.statusCode)
      .json(exceptionResponse as IResponse<any>);
  }
}
