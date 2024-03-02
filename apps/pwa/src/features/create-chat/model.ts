import { createMutation, update } from "@farfetched/core";
import { createChat } from "./api";
import { getChatsQuery } from "~/entities/chat";

export const createChatMutation = createMutation({
  handler: async ({ chatName }: { chatName: string }) => {
    return createChat(chatName);
  }
});

update(getChatsQuery, {
  on: createChatMutation,
  by: {
    success({ query, mutation }) {
      return {
        result: {
          // @ts-ignore
          ...query.result,
          data: [
            // @ts-ignore
            ...query.result.data,
            mutation.result,
          ],
        },
      };
    },
  },
})
