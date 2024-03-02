import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatCreate, ChatEntity, GetChatHistory, GetChatList, InjectPinoLogger, MessageEntity, PinoLogger, SendMessageToChat, methodLog } from '@app/shared';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Paginated } from 'nestjs-paginate';

@Controller('chat')
export class ChatController {
  public constructor(
    private readonly chatService: ChatService,
    @InjectPinoLogger(ChatController.name) private readonly logger: PinoLogger,
  ) {}

  @MessagePattern('chat.list')
  public async getChatList(
    @Payload() dto: GetChatList,
  ): Promise<Paginated<ChatEntity>> {
    using logger = methodLog(this.logger, this.getChatList.name);
    const result = await this.chatService.findAll(dto);
    return result;
  }

  @MessagePattern('chat.history')
  public async getChatHistory(
    @Payload() dto: GetChatHistory,
  ): Promise<Paginated<MessageEntity>> {
    using logger = methodLog(this.logger, this.getChatHistory.name);
    const result = await this.chatService.getHistory(dto);
    return result;
  }

  @MessagePattern('chat.create')
  public async create(
    @Payload() dto: ChatCreate,
  ): Promise<ChatEntity> {
    using logger = methodLog(this.logger, this.create.name);
    const result = await this.chatService.create(dto);
    return result;
  }

  @MessagePattern('chat.sendMessage')
  public async sendMessage(
    @Payload() dto: SendMessageToChat,
  ): Promise<MessageEntity> {
    using logger = methodLog(this.logger, this.sendMessage.name);
    const result = await this.chatService.sendMessage(dto);
    return result;
  }
}
