import { httpClient } from "~/shared/networking";
import { IUser } from "./types";

export const getUser = (): Promise<IUser> =>
  httpClient.get<IUser>('/user/me').then(({ data }) => data);
