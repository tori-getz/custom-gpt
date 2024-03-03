import { GptGenerateInput, GptGenerateOutput, InjectPinoLogger, PinoLogger, attachScope, methodLog } from '@app/shared';
import { Controller, Get, Query } from '@nestjs/common';
import { GptService } from './gpt.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('gpt')
export class GptController {
  public constructor(
    @InjectPinoLogger(GptController.name) private readonly logger: PinoLogger,
    private readonly gptService: GptService
  ) {}

  @MessagePattern('gpt.generate')
  public async generate(
    @Payload() dto: GptGenerateInput,
  ): Promise<GptGenerateOutput> {
    methodLog(this.logger, this.generate.name);

    const result = this.gptService.generate(dto);

    return result;
  }
}
