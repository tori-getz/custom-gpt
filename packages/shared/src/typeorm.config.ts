import { path as appRoot } from 'app-root-path';
import * as path from 'node:path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { ChatEntity, MessageEntity } from './entities';

const ENV_FILE_PATH = path.resolve(appRoot, '.env');

dotenv.config({
  path: ENV_FILE_PATH
});

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('TYPEORM_HOST'),
  port: configService.get<number>('TYPEORM_PORT'),
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  entities: [ChatEntity, MessageEntity],
  synchronize: false,
  migrations: [path.resolve(__dirname, 'migrations/**.ts')]
});
