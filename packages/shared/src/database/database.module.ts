import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "../config";
import { getTypeOrmConfig } from "../configs/typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    })
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class DatabaseModule {}
