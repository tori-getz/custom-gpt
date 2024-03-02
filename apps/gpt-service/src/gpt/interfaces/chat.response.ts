import { IChatChoice } from "./choice.interface";

export interface IChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  system_fingerprint: string;
  choices: Array<IChatChoice>;
  usega: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  }
}
