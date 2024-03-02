import { Module } from '@nestjs/common';
import { ConfigModule, getPinoConfig } from '@app/shared';
import { GptModule } from './gpt/gpt.module';
import { LoggerModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule,
    GptModule,
    LoggerModule.forRoot(getPinoConfig('gpt-service')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
