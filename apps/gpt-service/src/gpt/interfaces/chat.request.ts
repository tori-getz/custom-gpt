import { IChatMessage } from "./message.interface";

export interface IChatRequest {
  model: string;
  messages: Array<IChatMessage>;
}
