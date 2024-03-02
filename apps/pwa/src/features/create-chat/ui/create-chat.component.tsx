import React, { useState } from "react";
import { Button } from "~/shared/ui/buttons/button"
import { MdCreate } from 'react-icons/md';
import { CreateChatModal } from "./create-chat-modal";
import { createChatMutation } from "../model";

export const CreateChat: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onConfirm = (title: string) => {
    setModalOpen(false);
    createChatMutation.start({ chatName: title });
  };

  return (
    <>
      <CreateChatModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateChat={onConfirm}
      />
      <Button
        left={<MdCreate />}
        onClick={() => setModalOpen(true)}
      >
        Создать чат
      </Button>
    </>
  )
}
