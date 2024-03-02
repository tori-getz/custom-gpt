import React, { ReactNode } from "react";
import { MessageFrom } from "../types";
import { match } from "ts-pattern";
import { MdPerson } from "react-icons/md";
import { FaRobot } from 'react-icons/fa';
import cn from 'classnames';
import cls from './message-card.module.sass';

interface IMessageCardProps {
  content: string;
  from: MessageFrom;
}

export const MessageCard: React.FC<IMessageCardProps> = ({
  content,
  from,
}) => {
  return (
    <div className={cn(
      cls.container,
      cls[`container__${from}`]
    )}>
      <div>
        <div className={cls.avatar}>
          {getAvatar(from)}
        </div>
      </div>
      <div className={cn(
        cls.message,
        cls[`message__${from}`]
      )}>
        {content}
      </div>
    </div>
  )
};

export const getAvatar = (from: MessageFrom): ReactNode => match<MessageFrom>(from)
  .with(MessageFrom.User, () => <MdPerson size={40} />)
  .with(MessageFrom.Bot, () => <FaRobot size={40} />)
  .exhaustive();
