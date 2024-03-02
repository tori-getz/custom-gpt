import { createRootRoute, createRouter } from "@tanstack/react-router";
import { chatRoute } from "~/pages/chat.page";
import { chatsIndexRoute } from "~/pages/chats-index.page";
import { chatsRoute } from '~/pages/main.page';

export const rootRoute = createRootRoute();

export const routeTree = rootRoute.addChildren([
  chatsRoute.addChildren([
    chatsIndexRoute,
    chatRoute,
  ]),
]);

export const router = createRouter({ routeTree });
