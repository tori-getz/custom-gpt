import { ConfigModuleOptions } from '@nestjs/config';
import { path as appRoot } from 'app-root-path';
import * as path from 'node:path';

const ENV_FILE_PATH = path.resolve(appRoot, '.env');

export const getEnvConfig = (): ConfigModuleOptions => {
  return {
    envFilePath: ENV_FILE_PATH,
    isGlobal: true,
  };
}
