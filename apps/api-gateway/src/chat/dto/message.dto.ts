import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';
import { ChatDto } from './chat.dto';

export enum ChatSender {
  USER = 'user',
  BOT = 'bot'
}

export class MessageDto {
  @ApiProperty()
  @IsString()
  public id: string;

  @ApiProperty()
  @IsString()
  public from: ChatSender;

  @ApiProperty()
  @IsString()
  public content: string;

  @ApiProperty()
  @IsObject()
  public chat: ChatDto;
}
