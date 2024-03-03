import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateChatDto {
  @ApiProperty()
  @IsString()
  public chatName: string;

  @ApiProperty()
  @IsString()
  public archetype: string;

  @ApiProperty()
  @IsString()
  public telegramApiToken: string;
}
