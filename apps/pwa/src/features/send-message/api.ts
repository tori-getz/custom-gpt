import { IMessage } from "~/entities/message";
import { httpClient } from "~/shared/networking";

export const sendMessage = (text: string, chatId: string): Promise<IMessage> =>
  httpClient.post<IMessage>(`/chats/${chatId}/send-message`, { text }).then(({ data }) => data);
