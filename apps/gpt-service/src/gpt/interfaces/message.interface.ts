import { ChatRole } from './chat-role.enum';

export interface IChatMessage {
  role: ChatRole;
  content: string;
}
