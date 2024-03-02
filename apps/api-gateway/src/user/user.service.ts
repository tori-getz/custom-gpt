import { GetUserById, InjectPinoLogger, PinoLogger, UserEntity, methodLog } from '@app/shared';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  public constructor(
    @InjectPinoLogger(UserService.name) private readonly logger: PinoLogger,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  public onApplicationBootstrap() {
    this.userService.connect();
  }

  public async getById(userId: string): Promise<UserEntity> {
    using logger = methodLog(this.logger, this.getById.name);

    const getUserById = new GetUserById();
    getUserById.id = userId;

    const findUser = await firstValueFrom(
      this.userService.send<UserEntity>('user.getUserById', getUserById).pipe(
        catchError(e => {
          logger.logError(e);
          throw e;
        })
      )
    );

    return findUser;
  }
}
