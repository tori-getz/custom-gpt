import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { JwtModule, getClientProvider } from '@app/shared';

@Module({
  imports: [
    ClientsModule.registerAsync([
      getClientProvider('USER_SERVICE')
    ]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
