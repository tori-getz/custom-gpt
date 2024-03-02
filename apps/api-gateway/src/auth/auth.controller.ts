import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectPinoLogger, PinoLogger, UserEntity, methodLog } from '@app/shared';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    @InjectPinoLogger(AuthController.name) private readonly logger: PinoLogger,
  ) {}

  @Post('register')
  public async register(
    @Body() dto: AuthDto,
  ): Promise<UserEntity> {
    using logger = methodLog(this.logger, this.register.name);
    try {
      const user = await this.authService.register(dto);

      delete user.passwordHash;

      return user;
    } catch (e: any) {
      throw new BadRequestException('Registration was failed');
    }
  }

  @Post('login')
  public async login(
    @Body() dto: AuthDto,
  ) {
    using logger = methodLog(this.logger, this.login.name);

    const authResponse = await this.authService.login(dto);
    
    delete authResponse.user.passwordHash;

    return authResponse;
  }
}
