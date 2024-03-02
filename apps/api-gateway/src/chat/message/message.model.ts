import { IMessageModelData, IMessageModelOptions } from "./message.interfaces";


export class MessageModel<T = IMessageModelData> {
  public type: string;
  public data: T;

  public constructor({ type, data }: IMessageModelOptions<T>) {
    this.type = type;
    this.data = data;
  }

  public toString(): string {
    return [
      `event: ${this.type}\n`,
      `data: ${JSON.stringify(this.data)}\n\n`
    ].join('');
  }
}
