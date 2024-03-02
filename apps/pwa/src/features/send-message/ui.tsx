import { getRouteApi } from "@tanstack/react-router";
import { useUnit } from "effector-react";
import React, { useCallback, useState } from "react";
import { MdSend } from "react-icons/md";
import { Button } from "~/shared/ui/buttons/button";
import { Input } from "~/shared/ui/input";
import { sendMessageMutation } from ".";
import { Spinner } from "~/shared/ui/spinner";
import { $botTyping, setBotTyping } from "~/entities/message";

const routeApi = getRouteApi('/chats/$chatId');

export const SendMessage: React.FC = () => {
  const [text, setText] = useState<string>('');

  const { chatId } = routeApi.useParams();
  const { pending } = useUnit(sendMessageMutation);
  const botTyping = useUnit($botTyping);

  const sendMessage = useCallback(async () => {
    setText('');
    await sendMessageMutation.start({ text, chatId });
    setBotTyping(true);
  }, [text, chatId]);

  const getRight = useCallback(() => {
    if (pending) return <Spinner />

    return (
      <Button
        left={<MdSend />}
        disabled={text === '' || botTyping}
        onClick={sendMessage}
      >
        Отправить
      </Button>
    )
  }, [pending, text, botTyping]);

  return (
    <Input
      placeholder="Введите текст сообщения"
      value={text}
      onChange={(e) => setText(e.target.value)}
      right={getRight()}
    />
  );
}
