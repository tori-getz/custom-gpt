import { PinoLogger, Params } from 'nestjs-pino';
import pino from 'pino';

export * from 'nestjs-pino';

export interface IMethodLog {
  log(msg: any): void;
  logError(error: any): void;
  [Symbol.dispose]: () => void;
}

export const attachScope = (scope: string): (msg: string) => string => {
  return (message: string): string => {
    return `[${scope}] ${message}`;
  };
};

export const methodLog = (
  logger: PinoLogger,
  methodName: string,
): IMethodLog => {
  const withScope = attachScope(methodName);

  logger.info(withScope('start'));

  return {
    log(msg: any): void {
      logger.info(withScope(msg));
    },
    logError(msg: any): void {
      logger.info(withScope(msg));
    },
    [Symbol.dispose]() {
      logger.info(withScope('end'));
    }
  }
}

export const getPinoConfig = (serviceName: string): Params => ({
  pinoHttp: {
    transport: {
      targets: [
        {
          target: 'pino-loki',
          options: {
            host: process.env.LOKI_INSTANCE_URL,
            batching: false,
            labels: {
              application: serviceName,
              environment: process.env.LOKI_ENVIRONMENT,
            },
          }
        },
        {
          target: 'pino-pretty',
        }
      ],
    },
  }
})

