import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule } from '@nestjs/microservices';
import { getClientProvider } from '@app/shared';

@Module({
  imports: [
    ClientsModule.registerAsync([
      getClientProvider('AUTH_SERVICE'),
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
