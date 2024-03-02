import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@app/shared';
import { ConfigService } from '@app/shared';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CHAT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService): Promise<ClientOptions> => {
          const config = configService.getConfig();
          return {
            transport: Transport.NATS,
            options: {
              servers: [config.nats.server]
            }
          }
        }
      }
    ]),
  ],
  providers: [
    ChatService,
  ],
  controllers: [ChatController]
})
export class ChatModule {}
