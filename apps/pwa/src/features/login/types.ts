import { IUser } from "~/entities/user/types";

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}
