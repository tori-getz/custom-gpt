import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ClientsModule } from '@nestjs/microservices';
import { ChatEntity, MessageEntity, UserEntity, getClientProvider } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClientsModule.registerAsync([
      getClientProvider('GPT_SERVICE'),
      getClientProvider('API_GATEWAY'),
    ]),
    TypeOrmModule.forFeature([ChatEntity, MessageEntity, UserEntity])
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
