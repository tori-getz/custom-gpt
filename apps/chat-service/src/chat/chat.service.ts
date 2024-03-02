import { BroadcastMessage, ChatCreate, ChatEntity, ChatSender, GetChatHistory, GetChatList, GptGenerateInput, GptGenerateOutput, InjectPinoLogger, MessageEntity, PinoLogger, SendMessageToChat, UserEntity, methodLog } from '@app/shared';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Paginated, paginate } from 'nestjs-paginate';
import { catchError, firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService implements OnApplicationBootstrap {
  public constructor(
    @Inject('GPT_SERVICE') private readonly gptService: ClientProxy,
    @Inject('API_GATEWAY') private readonly apiGateway: ClientProxy,
    @InjectPinoLogger(ChatService.name) private readonly logger: PinoLogger,
    @InjectRepository(ChatEntity) private readonly chatRepository: Repository<ChatEntity>,
    @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  public onApplicationBootstrap() {
    this.gptService.connect();
    this.apiGateway.connect();
  }

  public async findAll(dto: GetChatList): Promise<Paginated<ChatEntity>> {
    using logger = methodLog(this.logger, this.findAll.name);

    const response = await paginate(dto.query, this.chatRepository, {
      sortableColumns: ['id'],
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'DESC']],
      select: ['id', 'name'],
      where: {
        user: {
          id: dto.authPayload.userId,
        }
      }
    });

    logger.log(`find ${response.meta.totalItems} chats`);

    return response;
  }

  public async getHistory(dto: GetChatHistory): Promise<Paginated<MessageEntity>> {
    using logger = methodLog(this.logger, this.getHistory.name);

    const response = await paginate(dto.query, this.messageRepository, {
      sortableColumns: ['id'],
      searchableColumns: ['content'],
      defaultSortBy: [['id', 'ASC'], ['createdAt', 'ASC']],
      select: ['id', 'content', 'from', 'createdAt'],
      where: {
        chat: {
          id: dto.chatId,
          user: {
            id: dto.authPayload.userId,
          }
        },
      },
    });

    logger.log(`find ${response.meta.totalItems} at chat with id ${dto.chatId}`);

    return response;
  }

  public async create({ chatName, authPayload }: ChatCreate): Promise<ChatEntity> {
    using logger = methodLog(this.logger, this.create.name);
    
    const user = await this.userRepository.findOne({
      where: {
        id: authPayload.userId
      }
    });

    const chat = this.chatRepository.create({
      name: chatName,
      user,
    });

    return this.chatRepository.save(chat);
  }

  public async sendMessage({ chatId, content, authPayload }: SendMessageToChat): Promise<MessageEntity> {
    using logger = methodLog(this.logger, this.sendMessage.name);

    logger.log('find chat with id ' + chatId)
    const chat = await this.chatRepository.findOne({
      where: {
        id: chatId,
        user: {
          id: authPayload.userId,
        }
      } 
    });

    if (!chat) {
      logger.logError(`Chat with id ${chatId} not found`);
      throw new RpcException(`Chat with id ${chatId} not found`);
    }

    const message = this.messageRepository.create({
      content: content,
      from: ChatSender.USER,
      chat,
    })

    await this.messageRepository.save(message);

    logger.log(`message ${message.id} created`);

    this.getBotAnswer(message.content, chat);
    
    return message;
  }

  public async getBotAnswer(content: string, chat: ChatEntity): Promise<void> {
    using logger = methodLog(this.logger, this.getBotAnswer.name);

    try {
      const gptGenerateInput = new GptGenerateInput();
      gptGenerateInput.input = content;

      logger.log(`input - ${content}`);
      const gptGenerateOutput = await firstValueFrom(
        this.gptService.send<GptGenerateOutput>('gpt.generate', gptGenerateInput).pipe(
          catchError(e => {
            logger.logError(e);
            throw e;
          })
        )
      );
      logger.log(`output - ${gptGenerateOutput.output}`);

      const message = this.messageRepository.create({
        content: gptGenerateOutput.output,
        from: ChatSender.BOT,
        chat,
      });

      await this.messageRepository.save(message);

      const broadcastMessage = new BroadcastMessage();
      broadcastMessage.chatId = chat.id;
      broadcastMessage.message = message;

      this.apiGateway.emit('apiGateway.broadcastMessage', broadcastMessage);
    } catch (e) {
      throw e;
    }
  }
}
