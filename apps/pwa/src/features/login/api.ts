import { httpClient } from "~/shared/networking";
import { IAuthResponse } from "./types";

export const login = (login: string, password: string): Promise<IAuthResponse> =>
  httpClient.post<IAuthResponse>('/auth/login', { login, password }).then(({ data }) => data);
