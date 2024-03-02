import { MessageEntity } from "@app/shared";

export interface IMessageModelOptions<T = IMessageModelData> {
  type: string;
  data: T;
}

export interface IMessageModelData {
  message: MessageEntity;
}
