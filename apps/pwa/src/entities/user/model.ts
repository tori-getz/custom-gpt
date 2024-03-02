import { createQuery } from "@farfetched/core";
import { getUser } from "./api";

export const getUserQuery = createQuery({
  handler: async () => {
    return getUser();
  },
});
