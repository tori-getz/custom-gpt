import { createQuery } from '@farfetched/core';
import { getChats } from './api';

export const getChatsQuery = createQuery({
  handler: async ({ page }: { page: number }) => {
    return getChats(page);
  }
});
