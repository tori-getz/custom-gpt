import { IChat } from "~/entities/chat"
import { httpClient } from "~/shared/networking"

export const createChat = (chatName: string): Promise<IChat> =>
  httpClient.post<IChat>('/chats/', { chatName }).then(({ data }) => data);
