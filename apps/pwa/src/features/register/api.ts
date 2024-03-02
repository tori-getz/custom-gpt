import { IUser } from "~/entities/user/types";
import { httpClient } from "~/shared/networking";

export const register = (login: string, password: string): Promise<IUser> =>
  httpClient.post<IUser>('/auth/register/', { login, password }).then(({ data }) => data);
