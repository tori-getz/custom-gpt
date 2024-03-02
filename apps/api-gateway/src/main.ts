import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { ConfigService, Logger } from '@app/shared';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new NestLogger(bootstrap.name);

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const config = configService.getConfig();

  app.useLogger(app.get(Logger))
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(config.apiGateway.prefix);
  app.enableCors({
    origin: '*',
  });

  const documentConfig = new DocumentBuilder()
    .setTitle('Gopnik API Gateway')
    .setDescription('GPT Bot')
    .setVersion('1.0')
    .setBasePath(config.apiGateway.prefix)
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup(config.apiGateway.swaggerUrl, app, document);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [config.nats.server]
    }
  })

  await app.startAllMicroservices();
  await app.listen(config.apiGateway.port);

  logger.log(`API Gateway listen at ${config.apiGateway.port} port`);
}
bootstrap();
