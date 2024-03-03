import { NestFactory } from '@nestjs/core';
import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { Logger } from '@app/shared';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();

  const natsServerUrl = configService.get<string>('NATS_SERVER')

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: [natsServerUrl]
    }
  });

  const logger = new NestLogger(bootstrap.name);

  logger.log(`NATS Server URL - ${natsServerUrl}`)

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe())

  app.listen();
}
bootstrap();
