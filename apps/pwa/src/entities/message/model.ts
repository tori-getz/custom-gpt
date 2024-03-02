import { createMutation, createQuery, update } from "@farfetched/core";
import { getMessages } from "./api";
import { IMessage } from ".";
import { createEvent, createStore } from "effector";

export const getMessagesQuery = createQuery({
  handler: async ({ chatId, page }: { chatId: string, page: number }) => {
    return getMessages(chatId, page);
  },
});

export const receiveMessageMutation = createMutation({
  handler: async ({ message }: { message: IMessage }) => {
    return message;
  },
});

update(getMessagesQuery, {
  on: receiveMessageMutation,
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
});

export const $botTyping = createStore<boolean>(false);

export const setBotTyping = createEvent<boolean>('set bot typing');

$botTyping.on(setBotTyping, (_, botTyping) => botTyping);
