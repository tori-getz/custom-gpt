import React from 'react';
import { Button } from '~/shared/ui/buttons/button';
import { ButtonType } from '~/shared/ui/buttons/button-base';

interface IChatCardProps {
  title: string;
  onClick: () => void;
}

export const ChatCard: React.FC<IChatCardProps> = ({
  title,
  onClick
}) => {
  return (
    <Button
      type={ButtonType.Transparent}
      onClick={onClick}
    >
      {title}
    </Button>
  )
}
