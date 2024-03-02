import { CreateUser, GetUserById, GetUserByName, InjectPinoLogger, PinoLogger, UserEntity, methodLog } from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  public constructor(
    private readonly userService: UserService,
    @InjectPinoLogger(UserController.name) private readonly logger: PinoLogger,
  ) {}

  @MessagePattern('user.getUserById')
  public async getUserById(
    @Payload() dto: GetUserById
  ): Promise<UserEntity> {
    using logger = methodLog(this.logger, this.getUserById.name);

    const findUser = await this.userService.getById(dto.id);

    return findUser;
  }

  @MessagePattern('user.getUserByName')
  public async getUserByName(
    @Payload() dto: GetUserByName,
  ): Promise<UserEntity> {
    using logger = methodLog(this.logger, this.getUserByName.name);

    const findUser = await this.userService.getUserByName(dto.name);

    if (!findUser) {
      throw new Error(`User "${dto.name}" not found!`);
    }

    return findUser;
  }

  @MessagePattern('user.create')
  public async create(
    @Payload() dto: CreateUser,
  ): Promise<UserEntity> {
    using logger = methodLog(this.logger, this.create.name);

    const user = await this.userService.create(dto);
    
    logger.log(`user with id ${user.id} was created!`);

    return user;
  }
}
