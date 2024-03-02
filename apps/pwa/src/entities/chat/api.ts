import { IPaginationResponse } from "~/shared/types";
import { IChat } from "./types";
import { httpClient } from "~/shared/networking";

export const getChats = (page: number): Promise<IPaginationResponse<IChat>> =>
  httpClient.get<IPaginationResponse<IChat>>(`/chats/?page=${page}`).then(({ data }) => data);
