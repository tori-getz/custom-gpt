import { IsString } from "class-validator";
import { MessageEntity } from "src/entities";

export class BroadcastMessage {
  @IsString()
  public chatId: string;

  public message: MessageEntity;
}
