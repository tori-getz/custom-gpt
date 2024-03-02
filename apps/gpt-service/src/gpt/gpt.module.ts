import { Module } from '@nestjs/common';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@app/shared';
import { getOpenAiApiConfig } from 'src/configs/openai-api.config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getOpenAiApiConfig
    })
  ],
  controllers: [GptController],
  providers: [GptService]
})
export class GptModule {}
