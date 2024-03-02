import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "~/app/routing";
import { UserCard } from "~/entities/user/ui";
import { CreateChat } from "~/features/create-chat";
import { ChatList } from "~/widgets/chat-list";
import { Layout } from "~/widgets/layout/ui";

export const MainPage: React.FC = () => {
  return (
    <Layout>
      <ChatList>
        <CreateChat />
      </ChatList>
      <UserCard />
    </Layout>
  )
}

export const chatsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'chats',
  component: MainPage,
});
