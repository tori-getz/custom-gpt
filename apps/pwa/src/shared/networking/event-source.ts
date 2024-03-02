import { env } from "~/shared/config/env";
import { $accessToken } from "./model";

export const createEventSource = (endpoint: string): EventSource => {
  let url = env.api.baseUrl + endpoint;

  const accessToken = $accessToken.getState();

  if (accessToken) {
    url += `?accessToken=${accessToken}`;
  }

  return new EventSource(url);
};
