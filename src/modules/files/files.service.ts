import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from '@aws-sdk/client-s3';
import { EEnv } from 'src/constants/env.constant';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  private s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: configService.get<string>(EEnv.MINIO_REGION),
      credentials: {
        accessKeyId: configService.get<string>(EEnv.MINIO_ACCESS_KEY),
        secretAccessKey: configService.get<string>(EEnv.MINIO_SECRET_KEY),
      },
      endpoint: configService.get<string>(EEnv.MINIO_CLIENT_URL),
      forcePathStyle: true,
    });
  }

  async upload(buffer: Buffer) {
    const bucket = this.configService.get<string>(EEnv.MINIO_BUCKET);
    const name = uuid();
    await this.s3.putObject({
      Bucket: bucket,
      Key: `${name}.png`,
      Body: buffer,
    });
    return name;
  }
}
