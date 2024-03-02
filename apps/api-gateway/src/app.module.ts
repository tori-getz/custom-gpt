import { ConfigModule, LoggerModule, getPinoConfig } from "@app/shared";
import { Module } from "@nestjs/common";
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRoot(getPinoConfig('api-gateway')),
    ChatModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
