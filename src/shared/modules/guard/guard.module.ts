import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    { provide: APP_GUARD, useClass: PermissionGuard },
  ],
})
export class GuardModule {}
