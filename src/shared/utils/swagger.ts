import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EEnv } from 'src/constants/env.constant';

export const enableSwagger = (
  app: INestApplication,
  configService: ConfigService,
) => {
  const config = new DocumentBuilder()
    .setTitle('App API')
    .setDescription('The App API description')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(configService.get<string>(EEnv.SWAGGER), app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
