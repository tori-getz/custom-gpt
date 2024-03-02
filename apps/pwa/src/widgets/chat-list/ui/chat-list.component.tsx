import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import cls from './chat-list.module.sass';
import { ChatCard, getChatsQuery } from "~/entities/chat";
import { isEmpty } from "lodash";
import { useUnit } from 'effector-react';
import { Spinner } from "~/shared/ui/spinner";
import { router } from "~/app/routing";

interface IChatListProps extends PropsWithChildren {
}

export const ChatList: React.FC<IChatListProps> = ({
  children,
}) => {
  const [page, _setPage] = useState<number>(1);

  const { data, pending } = useUnit(getChatsQuery);

  useEffect(() => {
    getChatsQuery.start({ page });
  }, [page]);

  const renderChats = useCallback(() => {
    if (pending) return <Spinner />;

    if (isEmpty(data?.data)) return (
      <div className={cls.notfound}>
        <span className={cls.notfound__text}>Пока нет чатов</span>
      </div>
    );

    return data?.data.map((chat) => (
      <ChatCard
        key={chat.id}
        title={chat.name}
        onClick={() => {
          console.log(`navigate ${chat.id}`)
          router.navigate({
            from: '/chats/$chatId',
            params: {
              chatId: chat.id,
            },
          })
        }}
      />
    ));
  }, [data, pending]);

  return (
    <div className={cls.container}>
      <div className={cls.container__top}>
        {children}
      </div>
      <div className={cls.container__list}>
        {renderChats()}
      </div>
    </div>
  );
};
