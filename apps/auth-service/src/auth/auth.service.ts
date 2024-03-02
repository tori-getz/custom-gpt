import { Auth, AuthPayload, CreateUser, GetUserById, GetUserByName, InjectPinoLogger, PinoLogger, UserEntity, methodLog } from '@app/shared';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  public constructor(
    @InjectPinoLogger(AuthService.name) private readonly logger: PinoLogger,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  public onApplicationBootstrap() {
    this.userService.connect();
  }

  public async verify(userId: string): Promise<AuthPayload> {
    using logger = methodLog(this.logger, this.verify.name);

    const getUserById = new GetUserById();
    getUserById.id = userId;

    const findUser = await firstValueFrom(
      this.userService.send<UserEntity>('user.getUserById', getUserById).pipe(
        catchError(e => {
          logger.logError(e);
          throw e;
        }),
      ),
    );

    const payload = new AuthPayload();
    payload.userId = findUser.id;

    return payload;
  }

  public async findUser(username: string): Promise<UserEntity> {
    using logger = methodLog(this.logger, this.findUser.name);

    try {
      const getUserByName = new GetUserByName();
      getUserByName.name = username;
  
      const findUser = await firstValueFrom(
        this.userService.send<UserEntity>('user.getUserByName', getUserByName).pipe(
          catchError(e => {
            logger.logError(e);
            throw e;
          })
        )
      )
  
      logger.log(`user with username "${username}" found, id: ${findUser.id}`)
  
      return findUser;
    } catch (e) {
      return null;
    }
  }

  public async register(dto: Auth): Promise<UserEntity> {
    using logger = methodLog(this.logger, this.register.name);

    const salt = await bcrypt.genSalt(10);

    const createUser = new CreateUser();
    createUser.name = dto.login;
    createUser.passwordHash = await bcrypt.hash(dto.password, salt);

    const user = await firstValueFrom(
      this.userService.send<UserEntity>('user.create', createUser).pipe(
        catchError(e => {
          logger.logError(e);
          throw e;
        }),
      ),
    );

    return user;
  }

  public async login(user: UserEntity): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.signAsync({
      userId: user.id,
    });

    return { accessToken };
  }
}
