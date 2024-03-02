import { createRoute } from "@tanstack/react-router";
import { chatsRoute } from "./main.page";
import { MessageList } from "~/widgets/message-list/ui";
import { SendMessage } from "~/features/send-message";
import { useEffect } from "react";
import { IMessage, listenMessages, receiveMessageMutation, setBotTyping } from "~/entities/message";

const ChatPage: React.FC = () => {
  const { chatId } = chatRoute.useParams();

  useEffect(() => {
    const evt = listenMessages(chatId);

    evt.addEventListener('new-message', ({ data }: MessageEvent): void => {
      const { message }: { message: IMessage } = JSON.parse(data);

      setBotTyping(false);
      receiveMessageMutation.start({ message });
    })

    return () => {
      evt.close();
    }
  }, [chatId]);
  
  return (
    <MessageList>
      <SendMessage />
    </MessageList>
  );
};

export const chatRoute = createRoute({
  getParentRoute: () => chatsRoute,
  path: '$chatId',
  component: ChatPage,
});
