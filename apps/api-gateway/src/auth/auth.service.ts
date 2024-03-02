import { Auth, AuthResponse, InjectPinoLogger, UserEntity, methodLog } from '@app/shared';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDto } from './dto/auth.dto';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  public constructor(
    @InjectPinoLogger(AuthService.name) private readonly logger,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  public onApplicationBootstrap() {
    this.authService.connect();
  }

  public async register(dto: AuthDto): Promise<UserEntity> {
    using logger = methodLog(this.logger, this.register.name);

    const auth = new Auth();
    auth.login = dto.login;
    auth.password = dto.password;

    const user = firstValueFrom(
      this.authService.send<UserEntity>('auth.register', auth).pipe(
        catchError(e => {
          logger.logError(e);
          throw e;
        })
      )
    );

    return user;
  }

  public async login(dto: AuthDto): Promise<AuthResponse> {
    using logger = methodLog(this.logger, this.login.name);

    const auth = new Auth();
    auth.login = dto.login;
    auth.password = dto.password;

    const authResponse = await firstValueFrom(
      this.authService.send<AuthResponse>('auth.login', auth).pipe(
        catchError(e => {
          logger.logError(e);
          throw e;
        })
      )
    )

    return authResponse;
  }
}
