import { createMutation, update } from "@farfetched/core";
import { createChat } from "./api";
import { getChatsQuery } from "~/entities/chat";

export const createChatMutation = createMutation({
  handler: async ({ chatName, archetype }: { chatName: string, archetype: string }) => {
    return createChat(chatName, archetype);
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
