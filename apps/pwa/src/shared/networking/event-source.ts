import { env } from "~/shared/config/env";

export const createEventSource = (endpoint: string): EventSource => {
  const url = env.api.baseUrl + endpoint;

  return new EventSource(url);
};
