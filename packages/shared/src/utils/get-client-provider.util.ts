import { ConfigModule, ConfigService } from "../config";
import { ClientOptions, ClientsProviderAsyncOptions,  Transport } from '@nestjs/microservices';

export const getClientProvider = (clientName: string): ClientsProviderAsyncOptions => ({
  name: clientName,
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
});
