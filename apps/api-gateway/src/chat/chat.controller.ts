import { AuthPayload, BroadcastMessage, ChatEntity, InjectPinoLogger, JwtGuard, JwtUser, MessageEntity, PinoLogger, methodLog } from '@app/shared';
import { Body, Controller, Get, Param, Post, Sse, MessageEvent, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { ChatDto } from './dto/chat.dto';
import { MessageDto } from './dto/message.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  public constructor(
    private readonly chatService: ChatService,
    @InjectPinoLogger() private readonly logger: PinoLogger,
    private readonly jwtService: JwtService
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
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public async getChatList(
    @Paginate() query: PaginateQuery,
    @JwtUser() jwtUser: AuthPayload,
  ): Promise<Paginated<ChatEntity>> {
    using logger = methodLog(this.logger, this.getChatList.name);
    const result = await this.chatService.getChats(query, jwtUser);
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
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public async getChatHistory(
    @Param('chatId') chatId: string,
    @Paginate() query: PaginateQuery,
    @JwtUser() jwtUser: AuthPayload,
  ): Promise<Paginated<MessageEntity>> {
    using logger = methodLog(this.logger, this.getChatHistory.name);
    const result = await this.chatService.getHistory(chatId, query, jwtUser);
    return result;
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public async create(
    @Body() dto: CreateChatDto,
    @JwtUser() jwtUser: AuthPayload,
  ): Promise<ChatEntity> {
    using logger = methodLog(this.logger, this.create.name);
    const result = this.chatService.create(dto.chatName, jwtUser);
    return result;
  }

  @Post('/:chatId/send-message')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  public async sendMessage(
    @Param('chatId') chatId: string,
    @Body() dto: SendMessageDto,
    @JwtUser() jwtUser: AuthPayload,
  ): Promise<MessageEntity> {
    using logger = methodLog(this.logger, this.sendMessage.name);
    const result = this.chatService.sendMessage(dto, chatId, jwtUser);
    return result;
  }

  @Sse('/:chatId/subscribe')
  public subscribe(
    @Param('chatId') chatId: string,
    @Query('accessToken') accessToken: string,
  ): Observable<MessageEvent> {
    using logger = methodLog(this.logger, this.subscribe.name);

    const verified = this.jwtService.verify(accessToken);
    console.log('VERIFIED', verified);
    
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
