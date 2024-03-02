import { IsString } from "class-validator";
import { PaginateQuery } from 'nestjs-paginate';
import { AuthPayload } from "./auth.contracts";

export class ChatCreate {
  @IsString()
  public chatName: string;

  public authPayload: AuthPayload;
}

export class GetChatList {
  public query: PaginateQuery;

  public authPayload: AuthPayload;
}

export class GetChatHistory {
  public chatId: string;

  public query: PaginateQuery;

  public authPayload: AuthPayload;
}

export class SendMessageToChat {
  @IsString()
  public chatId: string;

  @IsString()
  public content: string;

  public authPayload: AuthPayload;
}
