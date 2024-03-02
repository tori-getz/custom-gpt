import { IsString } from "class-validator";

export class GptGenerateInput {
  @IsString()
  public input: string;
}

export class GptGenerateOutput {
  @IsString()
  public output: string;
}
