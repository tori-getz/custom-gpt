import { IsString } from "class-validator";
import { PaginateQuery } from 'nestjs-paginate';

export class ChatCreate {
  @IsString()
  public chatName: string;
}

export class GetChatList {
  public query: PaginateQuery;
}

export class GetChatHistory {
  @IsString()
  public chatId: string;

  public query: PaginateQuery;
}

export class SendMessageToChat {
  @IsString()
  public chatId: string;

  @IsString()
  public content: string;
}
