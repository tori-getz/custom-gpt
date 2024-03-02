import { Global, Module } from "@nestjs/common";
import { ConfigModule as EnvModule } from '@nestjs/config';
import { getEnvConfig } from "../configs/env.config";
import { ConfigService } from "./config.service";

@Global()
@Module({
  imports: [
    EnvModule.forRoot(getEnvConfig())
  ],
  providers: [
    ConfigService
  ],
  exports: [
    EnvModule,
    ConfigService,
  ]
})
export class ConfigModule {}
