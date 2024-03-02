import { createRoute } from "@tanstack/react-router";
import { chatsRoute } from "./main.page";
import { Welcome } from "~/widgets/welcome";

const ChatsIndexPage: React.FC = () => {
  return (
    <Welcome />
  )
}

export const chatsIndexRoute = createRoute({
  getParentRoute: () => chatsRoute,
  path: '/',
  component: ChatsIndexPage,
})
