import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthDto {
  @ApiProperty()
  @IsString()
  public login: string;

  @ApiProperty()
  @IsString()
  public password: string;
}
