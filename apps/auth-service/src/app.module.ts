import { Module } from '@nestjs/common';
import { ConfigModule, DatabaseModule, JwtModule, getPinoConfig } from '@app/shared';
import { LoggerModule } from '@app/shared';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRoot(getPinoConfig('auth-service')),
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
