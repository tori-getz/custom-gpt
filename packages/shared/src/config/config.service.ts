import { Injectable } from "@nestjs/common";
import { ConfigService as EnvService } from '@nestjs/config';
import { IConfig } from "./config.interface";

@Injectable()
export class ConfigService {
  public constructor(
    private readonly envService: EnvService
  ) {}

  public getConfig(): IConfig {
    return {
      openai: {
        apiUrl: this.envService.get<string>('OPENAI_API_URL'),
        model: this.envService.get<string>('OPENAI_MODEL'),
        accessToken: this.envService.get<string>('OPENAI_ACCESS_TOKEN')
      },
      typeorm: {
        host: this.envService.get<string>('TYPEORM_HOST'),
        port: this.envService.get<number>('TYPEORM_PORT'),
        username: this.envService.get<string>('TYPEORM_USERNAME'),
        password: this.envService.get<string>('TYPEORM_PASSWORD'),
        database: this.envService.get<string>('TYPEORM_DATABASE'),
      },
      nats: {
        server: this.envService.get<string>('NATS_SERVER'),
      },
      apiGateway: {
        port: this.envService.get<number>('API_GATEWAY_PORT'),
        swaggerUrl: this.envService.get<string>('API_GATEWAY_SWAGGER_URL'),
        prefix: this.envService.get<string>('API_GATEWAY_PREFIX'),
      }
    }
  }
}
