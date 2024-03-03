import { ConfigService, GptGenerateInput, GptGenerateOutput, InjectPinoLogger, PinoLogger, attachScope, methodLog } from '@app/shared';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IChatResponse } from './interfaces/chat.response';
import { IChatRequest } from './interfaces/chat.request';
import { ChatRole } from './interfaces/chat-role.enum';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';import { generatePrompt } from 'src/utils/generate-prompt.utilt';
;

@Injectable()
export class GptService {
  public constructor(
    @InjectPinoLogger(GptService.name) private readonly logger: PinoLogger,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async generate(dto: GptGenerateInput): Promise<GptGenerateOutput> {
    using logger = methodLog(this.logger, this.generate.name);
    
    const config = this.configService.getConfig();

    const request: IChatRequest = {
      model: config.openai.model,
      messages: [
        {
          role: ChatRole.USER,
          content: generatePrompt(dto.input, dto.archetype),
        },
      ],
    };

    logger.log(`input - ${dto.input}`);

    const { data } = await firstValueFrom(
      this.httpService.post<IChatResponse>('/chat/completions', request).pipe(
        catchError((error: AxiosError) => {
          logger.logError(error);
          throw error.message;
        })
      )
    );


    const [choice] = data.choices;
    const { content: output } = choice.message;

    logger.log(`output - ${output}`)
    
    const result = new GptGenerateOutput();
    result.output = output;

    return result;
  }
}
