import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from "class-validator";
import { MessageDto } from "./message.dto";
import { Type } from 'class-transformer';

export class ChatDto {
  @ApiProperty()
  @IsString()
  public id: string;

  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsString()
  public botArchetype: string;
}
