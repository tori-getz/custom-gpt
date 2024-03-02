import { Inject, Injectable, OnApplicationBootstrap, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayload, AuthVerify, ConfigService, InjectPinoLogger, PinoLogger, methodLog } from '@app/shared';
import { ClientProxy } from "@nestjs/microservices";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements OnApplicationBootstrap {
  public constructor(
    private readonly configService: ConfigService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @InjectPinoLogger(JwtStrategy.name) private readonly logger: PinoLogger,
  ) {
    const config = configService.getConfig()

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }

  public onApplicationBootstrap() {
    this.authService.connect();  
  }

  public async validate({ userId }: { userId: string }): Promise<AuthPayload> {
    using logger = methodLog(this.logger, this.validate.name);

    try {
      const authVerify = new AuthVerify();
      authVerify.userId = userId;

      const authPayload = await firstValueFrom(
        this.authService.send<AuthPayload>('auth.verify', authVerify).pipe(
          catchError(e => {
            logger.logError(e);
            throw e;
          })
        )
      );

      return authPayload;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
