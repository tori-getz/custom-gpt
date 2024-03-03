import { IChat } from "~/entities/chat"
import { httpClient } from "~/shared/networking"

export const createChat = (chatName: string, archetype: string): Promise<IChat> =>
  httpClient.post<IChat>('/chats/', { chatName, archetype }).then(({ data }) => data);
