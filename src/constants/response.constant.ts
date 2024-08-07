import { HttpStatus } from '@nestjs/common';

export interface IResponse<T> {
  status_code: HttpStatus;
  data?: T;
  message?: string;
  metadata?: {
    [key: string]: any;
  };
  timestamp: Date;
}
