export interface IConfig {
  openai: IConfigOpenAI;
  typeorm: IConfigTypeOrm;
  nats: IConfigNats;
  apiGateway: IConfigApiGateway;
}

export interface IConfigOpenAI {
  apiUrl: string;
  model: string;
  accessToken: string;
}

export interface IConfigTypeOrm {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface IConfigNats {
  server: string;
}

export interface IConfigApiGateway {
  port: number;
  swaggerUrl: string;
  prefix: string;
}
