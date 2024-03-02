import { IsString } from 'class-validator';

export class CreateUser {
  @IsString()
  public name: string;

  @IsString()
  public passwordHash: string;
}

export class GetUserByName {
  @IsString()
  public name: string;
}

export class GetUserById {
  @IsString()
  public id: string;
}
