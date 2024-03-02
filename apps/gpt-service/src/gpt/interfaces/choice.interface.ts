import { IChatMessage } from "./message.interface";

export interface IChatChoice {
  index: number;
  message: IChatMessage;
  finish_reason: string;
}
