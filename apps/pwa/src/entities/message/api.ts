import { IPaginationResponse } from "~/shared/types";
import { IMessage } from "./types";
import { createEventSource, httpClient } from "~/shared/networking";

export const getMessages = (chatId: string, page: number): Promise<IPaginationResponse<IMessage>> =>
  httpClient.get<IPaginationResponse<IMessage>>(`/chats/${chatId}/messages?page=${page}`).then(({ data }) => data);

export const listenMessages = (chatId: string): EventSource =>
  createEventSource(`/chats/${chatId}/subscribe`);
