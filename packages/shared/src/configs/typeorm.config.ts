import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "../config/config.service";
import { ChatEntity, MessageEntity } from "../entities";
import { path as appRoot } from 'app-root-path';
import * as path from 'node:path';

const MIGRATIONS_PATH = path.resolve(appRoot, 'migrations/');

export const getTypeOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  const config = configService.getConfig();

  return {
    type: 'postgres',
    host: config.typeorm.host,
    port: config.typeorm.port,
    username: config.typeorm.username,
    password: config.typeorm.password,
    database: config.typeorm.database,
    synchronize: false,
    migrations: [MIGRATIONS_PATH],
    entities: [ChatEntity, MessageEntity],
  };
};
