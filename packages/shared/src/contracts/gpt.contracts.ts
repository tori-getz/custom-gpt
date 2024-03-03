import { IsString } from "class-validator";

export class GptGenerateInput {
  @IsString()
  public input: string;

  @IsString()
  public archetype: string;
}

export class GptGenerateOutput {
  @IsString()
  public output: string;
}
