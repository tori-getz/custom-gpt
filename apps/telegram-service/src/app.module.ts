import { ConfigModule, LoggerModule, getPinoConfig } from '@app/shared';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRoot(getPinoConfig('telegram-service')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
