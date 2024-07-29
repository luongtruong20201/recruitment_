import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { EEnv } from 'src/constants/env.constant';

@Injectable()
export class FilesService {
  private s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: configService.get<string>(EEnv.MINIO_ACCESS_KEY),
        secretAccessKey: configService.get<string>(EEnv.MINIO_SECRET_KEY),
      },
      endpoint: configService.get<string>(EEnv.MINIO_CLIENT_URL),
      forcePathStyle: true,
    });
  }
}
