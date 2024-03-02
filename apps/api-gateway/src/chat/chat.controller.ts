import { BroadcastMessage, ChatEntity, InjectPinoLogger, MessageEntity, PinoLogger, methodLog } from '@app/shared';
import { Body, Controller, Get, Param, Post, Sse, MessageEvent } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { ChatDto } from './dto/chat.dto';
import { MessageDto } from './dto/message.dto';

@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  public constructor(
    private readonly chatService: ChatService,
    @InjectPinoLogger() private readonly logger: PinoLogger,
  ) {}

  @Get()
  @ApiOkPaginatedResponse(ChatDto, {
    sortableColumns: ['id'],
    searchableColumns: ['name'],
    defaultSortBy: [['id', 'DESC']],
    select: ['id', 'name'],
  })
  @ApiPaginationQuery({
    sortableColumns: ['id'],
    searchableColumns: ['name'],
    defaultSortBy: [['id', 'DESC']],
    select: ['id', 'name'],
  })
  public async getChatList(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<ChatEntity>> {
    using logger = methodLog(this.logger, this.getChatList.name);
    const result = await this.chatService.getChats(query);
    return result;
  }

  @Get('/:chatId/messages')
  @ApiOkPaginatedResponse(MessageDto, {
    sortableColumns: ['id'],
    searchableColumns: ['content'],
    defaultSortBy: [['id', 'DESC']],
    select: ['id', 'content'],
  })
  @ApiPaginationQuery({
    sortableColumns: ['id'],
    searchableColumns: ['content'],
    defaultSortBy: [['id', 'DESC']],
    select: ['id', 'content'],
  })
  public async getChatHistory(
    @Param('chatId') chatId: string,
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<MessageEntity>> {
    using logger = methodLog(this.logger, this.getChatHistory.name);
    const result = await this.chatService.getHistory(chatId, query);
    return result;
  }

  @Post()
  public async create(
    @Body() dto: CreateChatDto,
  ): Promise<ChatEntity> {
    using logger = methodLog(this.logger, this.create.name);
    const result = this.chatService.createChat(dto.chatName);
    return result;
  }

  @Post('/:chatId/send-message')
  public async sendMessage(
    @Param('chatId') chatId: string,
    @Body() dto: SendMessageDto,
  ): Promise<MessageEntity> {
    using logger = methodLog(this.logger, this.sendMessage.name);
    const result = this.chatService.sendMessage(dto, chatId);
    return result;
  }

  @Sse('/:chatId/subscribe')
  public subscribe(
    @Param('chatId') chatId: string,
  ): Observable<MessageEvent> {
    using logger = methodLog(this.logger, this.subscribe.name);
    
    const observer = this.chatService.getMessageObserver(chatId).pipe(
      map((message) => {
        const event: MessageEvent = {
          type: 'new-message',
          data: { message },
        };
        logger.log(`new message: ${JSON.stringify(event)}`);
        return event;
      })
    );

    observer.subscribe({
      complete: () => {
        this.chatService.removeMessageObserver(chatId);
      },
    });

    return observer;
  }

  @EventPattern('apiGateway.broadcastMessage')
  public async broadcastMessage(
    @Payload() { message, chatId }: BroadcastMessage,
  ): Promise<void> {
    using logger = methodLog(this.logger, this.broadcastMessage.name);
    this.chatService.emitMessage(message, chatId);
  }
}
