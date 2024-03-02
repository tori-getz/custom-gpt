import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthPayload, InjectPinoLogger, JwtGuard, JwtUser, PinoLogger, UserEntity, methodLog } from '@app/shared';

@ApiTags('User')
@Controller('user')
export class UserController {
  public constructor(
    private readonly userService: UserService,
    @InjectPinoLogger(UserController.name) private readonly logger: PinoLogger,
  ) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public async me(
    @JwtUser() jwtUser: AuthPayload,
  ): Promise<UserEntity> {
    using logger = methodLog(this.logger, this.me.name);
    const user = await this.userService.getById(jwtUser.userId);
    return user;
  }
}
