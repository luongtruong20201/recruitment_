import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EEnv } from './constants/env.constant';
import { Logger, ValidationPipe } from '@nestjs/common';
import { enableSwagger } from './shared/utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);
  const port = configService.get<number>(EEnv.PORT);

  enableSwagger(app, configService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port);

  logger.log(
    `Api docs is running on ${await app.getUrl()}/${configService.get<string>(EEnv.SWAGGER)}`,
  );
}
bootstrap();
