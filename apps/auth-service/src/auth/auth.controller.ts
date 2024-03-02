import { BadRequestException, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth, AuthPayload, AuthResponse, AuthVerify, InjectPinoLogger, PinoLogger, UserEntity, methodLog } from '@app/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    @InjectPinoLogger(AuthController.name) private readonly logger: PinoLogger,
  ) {}

  @MessagePattern('auth.verify')
  public async verify(
    @Payload() dto: AuthVerify,
  ): Promise<AuthPayload> {
    using logger = methodLog(this.logger, this.verify.name);
    
    const payload = await this.authService.verify(dto.userId);

    return payload;
  }

  @MessagePattern('auth.register')
  public async register(
    @Payload() dto: Auth
  ): Promise<UserEntity> {
    using logger = methodLog(this.logger, this.register.name);

    const findUser = await this.authService.findUser(dto.login);

    if (findUser) {
      throw new BadRequestException(`User with login "${dto.login}" already exists`);
    }

    const user = await this.authService.register(dto);

    return user;
  }
  
  @MessagePattern('auth.login')
  public async login(
    @Payload() dto: Auth,
  ): Promise<AuthResponse> {
    using logger = methodLog(this.logger, this.login.name);

    const findUser = await this.authService.findUser(dto.login);

    if (!findUser) {
      throw new BadRequestException(`User with login "${dto.login}" not found`);
    }

    const isCorrectPassword = await bcrypt.compare(dto.password, findUser.passwordHash);

    if (!isCorrectPassword) {
      throw new BadRequestException('Incorrect password');
    }

    const { accessToken } = await this.authService.login(findUser);
    
    const authResponse = new AuthResponse();
    authResponse.accessToken = accessToken;
    authResponse.user = findUser;

    return authResponse;
  }
}
