import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/shared/filters/all-exception.filter';
import { HttpExceptionFilter } from 'src/shared/filters/http-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class FiltersModule {}
