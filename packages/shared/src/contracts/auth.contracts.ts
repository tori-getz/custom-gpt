import { IsString } from 'class-validator';
import { UserEntity } from '../entities';

export class Auth {
  @IsString()
  public login: string;

  @IsString()
  public password: string;
}

export class AuthResponse {
  @IsString()
  public accessToken: string;

  public user: UserEntity;
}

export class AuthVerify {
  @IsString()
  public userId: string;
}

export class AuthPayload {
  @IsString()
  public userId: string;
}
