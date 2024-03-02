export enum MessageFrom {
  User = 'user',
  Bot = 'bot',
}

export interface IMessage {
  id: string;
  content: string;
  from: MessageFrom;
}
