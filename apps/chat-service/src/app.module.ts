import { ConfigModule, DatabaseModule, LoggerModule, getPinoConfig } from '@app/shared';
import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    LoggerModule.forRoot(getPinoConfig('chat-service')),
    ConfigModule,
    DatabaseModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
