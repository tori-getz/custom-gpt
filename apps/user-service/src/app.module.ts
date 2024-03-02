import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule, getPinoConfig } from '@app/shared';
import { LoggerModule } from '@app/shared';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    DatabaseModule,
    LoggerModule.forRoot(getPinoConfig('user-service')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
