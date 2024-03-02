import { ChatCreate, ChatEntity, GetChatHistory, GetChatList, InjectPinoLogger, MessageEntity, PinoLogger, SendMessageToChat, methodLog } from '@app/shared';
import { Inject, Injectable, OnApplicationBootstrap, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Observable, Subject, catchError, firstValueFrom } from 'rxjs';
import { SendMessageDto } from './dto/send-message.dto';
import { PaginateQuery, Paginated } from 'nestjs-paginate';

@Injectable()
export class ChatService implements OnApplicationBootstrap {
  private subjectsMap: Map<string, Subject<MessageEntity>> = new Map();

  public constructor(
    @Inject('CHAT_SERVICE') private readonly chatService: ClientProxy,
    @InjectPinoLogger(ChatService.name) private readonly logger: PinoLogger,
  ) {}

  public onApplicationBootstrap() {
    this.chatService.connect();
  }

  public async getChats(query: PaginateQuery): Promise<Paginated<ChatEntity>> {
    using logger = methodLog(this.logger, this.getChats.name);

    const getChatList = new GetChatList();
    getChatList.query = query;

    const chats = await firstValueFrom(
      this.chatService.send<Paginated<ChatEntity>>('chat.list', getChatList).pipe(
        catchError(e => {
          logger.logError(e);
          throw new RpcException(e);
        })
      )
    );

    return chats;
  }

  public async getHistory(chatId: string, query: PaginateQuery): Promise<Paginated<MessageEntity>> {
    using logger = methodLog(this.logger, this.getChats.name);

    const getChatHistory = new GetChatHistory();
    getChatHistory.chatId = chatId;
    getChatHistory.query = query;

    const messages = await firstValueFrom(
      this.chatService.send<Paginated<MessageEntity>>('chat.history', getChatHistory).pipe(
        catchError(e => {
          logger.logError(e);
          throw new RpcException(e);
        })
      )
    );

    return messages;
  }

  public async createChat(chatName: string): Promise<ChatEntity> {
    using logger = methodLog(this.logger, this.createChat.name);

    logger.log(`chat name - ${chatName}`);

    const chat = new ChatCreate();
    chat.chatName = chatName;

    const chatEntity = await firstValueFrom(
      this.chatService.send<ChatEntity>('chat.create', chat).pipe(
        catchError(e => {
          logger.logError(e);
          throw new RpcException(e);
        }),
      ),
    );

    logger.log(`new chat id - ${chatEntity.id}`);

    return chatEntity;
  }

  public async sendMessage(dto: SendMessageDto, chatId: string): Promise<MessageEntity> {
    using logger = methodLog(this.logger, this.sendMessage.name);
    
    const sendMessageToChat = new SendMessageToChat();
    sendMessageToChat.chatId = chatId;
    sendMessageToChat.content = dto.text;

    const message = await firstValueFrom(
      this.chatService.send<MessageEntity>('chat.sendMessage', sendMessageToChat).pipe(
        catchError(e => {
          logger.logError(e);
          throw new RpcException(e);
        })
      )
    )

    return message;
  }

  public async emitMessage(message: MessageEntity, chatId: string): Promise<void> {
    if (!this.subjectsMap.has(chatId)) return;

    const subject = this.subjectsMap.get(chatId);
    subject.next(message);
  }

  public getMessageObserver(chatId: string): Observable<MessageEntity> {
    using logger = methodLog(this.logger, this.getMessageObserver.name);
    if (!this.subjectsMap.has(chatId)) {
      this.subjectsMap.set(chatId, new Subject<MessageEntity>());
    }
    const subject = this.subjectsMap.get(chatId);
    return subject.asObservable();
  }

  public removeMessageObserver(chatId: string): void {
    this.subjectsMap.get(chatId).unsubscribe();
    this.subjectsMap.delete(chatId);
  }
}
