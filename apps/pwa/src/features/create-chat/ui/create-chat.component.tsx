import React, { useState } from "react";
import { Button } from "~/shared/ui/buttons/button"
import { MdCreate } from 'react-icons/md';
import { CreateChatModal } from "./create-chat-modal";
import { createChatMutation } from "../model";
import { setMenuOpened } from "~/widgets/layout";

export const CreateChat: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onConfirm = (title: string, archetype: string) => {
    setModalOpen(false);
    console.log('CREATE CHAT', title, archetype)
    createChatMutation.start({ chatName: title, archetype });
  };

  const onOpenModal = () => {
    setMenuOpened(false);
    setModalOpen(true)
  }

  return (
    <>
      <CreateChatModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateChat={onConfirm}
      />
      <Button
        left={<MdCreate />}
        onClick={onOpenModal}
      >
        Создать чат
      </Button>
    </>
  )
}
