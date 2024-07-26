import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IResponse } from 'src/constants/response.constant';

export function createResponse<T>(data: any): IResponse<T> {
  return {
    status_code: data?.status_code ? data.status_code : HttpStatus.OK,
    data: data?.data || data || [],
    metadata: data?.metadata
      ? {
          ...data.metadata,
        }
      : null,
    timestamp: new Date(),
  };
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  logger = new Logger(ResponseInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
    const request = context.switchToHttp().getRequest();
    this.logger.log(request.headers, request.query, request.params);

    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const responseData = createResponse(data);
        response.status(responseData.status_code);
        return createResponse(responseData);
      }),
    );
  }
}
