import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { ChatEntity, ConfigModule, ConfigService, MessageEntity } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'GPT_SERVICE',
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
      },
      {
        name: 'API_GATEWAY',
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
    TypeOrmModule.forFeature([ChatEntity, MessageEntity])
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
