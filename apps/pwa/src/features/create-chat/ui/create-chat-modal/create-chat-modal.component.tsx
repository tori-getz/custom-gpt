import React, { useState } from 'react';
import { Input } from '~/shared/ui/input';
import { IModalProps, Modal } from '~/shared/ui/modal';
import cls from './create-chat-modal.module.sass';
import { Button } from '~/shared/ui/buttons/button';
import { MdCheck } from 'react-icons/md';

interface ICreateChatModalProps extends IModalProps {
  onCreateChat: (title: string, archetype: string) => any;
}

export const CreateChatModal: React.FC<ICreateChatModalProps> = ({
  onCreateChat,
  ...modalProps
}) => {
  const [title, setTitle] = useState<string>('');
  const [archetype, setArchetype] = useState<string>('')

  const onConfirm = () => {
    onCreateChat(title, archetype);
  }

  return (
    <Modal
      title='Создать чат'
      className={cls.container}
      {...modalProps}
    >
      <Input
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Название чата'
      />
      <Input
        onChange={(e) => setArchetype(e.target.value)}
        placeholder='Архетип'
      />
      <Button
        left={<MdCheck />}
        onClick={onConfirm}
      >
        Создать
      </Button>
    </Modal>
  )
}
