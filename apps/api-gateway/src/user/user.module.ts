import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule } from '@nestjs/microservices';
import { JwtModule, getClientProvider } from '@app/shared';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    ClientsModule.registerAsync([
      getClientProvider('USER_SERVICE'),
      getClientProvider('AUTH_SERVICE'),
    ]),
    JwtModule,
    PassportModule,
  ],
  providers: [
    UserService,
    JwtStrategy,
  ],
  controllers: [UserController]
})
export class UserModule {}
