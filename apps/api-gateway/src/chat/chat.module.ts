import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ClientsModule } from '@nestjs/microservices';
import { JwtModule, getClientProvider } from '@app/shared';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    ClientsModule.registerAsync([
      getClientProvider('CHAT_SERVICE'),
      getClientProvider('AUTH_SERVICE'),
    ]),
    JwtModule,
    PassportModule
  ],
  providers: [
    ChatService,
    JwtStrategy,
  ],
  controllers: [ChatController]
})
export class ChatModule {}
