import { Module } from "@nestjs/common";
import { JwtModule as JsonWebTokenModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "../config";
import { getJwtConfig } from "../configs/jwt.config";

@Module({
  imports: [
    JsonWebTokenModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  exports: [
    JsonWebTokenModule,
  ],
})
export class JwtModule {}
