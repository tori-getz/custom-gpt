import { createMutation, update } from "@farfetched/core";
import { sendMessage } from "./api";
import { getMessagesQuery } from "~/entities/message";

export const sendMessageMutation = createMutation({
  handler: async ({ text, chatId }: { text: string, chatId: string }) => {
    return sendMessage(text, chatId);
  }
});

update(getMessagesQuery, {
  on: sendMessageMutation,
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
