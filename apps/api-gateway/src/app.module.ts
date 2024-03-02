import { ConfigModule, JwtModule, LoggerModule, getPinoConfig } from "@app/shared";
import { Module } from "@nestjs/common";
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRoot(getPinoConfig('api-gateway')),
    ChatModule,
    AuthModule,
    JwtModule,
    UserModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
