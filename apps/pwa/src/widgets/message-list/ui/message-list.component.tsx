import { getRouteApi } from "@tanstack/react-router";
import { useUnit } from "effector-react";
import { isEmpty } from "lodash";
import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { $botTyping, MessageCard, MessageFrom, getMessagesQuery } from "~/entities/message";
import { Spinner } from "~/shared/ui/spinner";
import cls from './message-list.module.sass';
import { IChat, getChatsQuery } from "~/entities/chat";
import { IconButton } from "~/shared/ui/buttons/icon-button";
import { MdArrowBack } from "react-icons/md";
import { router } from "~/app/routing";

export interface IMessageListProps extends PropsWithChildren {}

const routeApi = getRouteApi('/chats/$chatId');

export const MessageList: React.FC<IMessageListProps> = ({
  children
}) => {
  const [page, _setPage] = useState<number>(1);

  const { chatId } = routeApi.useParams();
  const { data: messages, pending } = useUnit(getMessagesQuery);
  const { data: chats } = useUnit(getChatsQuery);
  const chat: IChat | undefined = useMemo(() => chats?.data.find((chat) => chat.id === chatId), [chats, chatId]);

  const botTyping = useUnit($botTyping);

  useEffect(() => {
    getMessagesQuery.start({ chatId, page });
  }, [page, chatId]);

  const renderMessages = () => {
    if (pending) return <Spinner />

    if (isEmpty(messages?.data)) return 'empty';

    return messages?.data.map((message) => (
      <MessageCard
        key={message.id}
        content={message.content}
        from={message.from}
      />
    ));
  };

  return (
    <div className={cls.container}>
      <div className={cls.topbar}>
        <IconButton
          icon={MdArrowBack}
          onClick={() => router.navigate({ from: '/chats' })}
        />
        <h1 className={cls.topbar__title}>{chat?.name}</h1>
      </div>
      <div className={cls.list}>
        {renderMessages()}
        {botTyping && (
          <MessageCard
            from={MessageFrom.Bot}
            content="..."
          />
        )}
      </div>
      <div className={cls.bottombar}>
        {children}
      </div>
    </div>
  );
};
