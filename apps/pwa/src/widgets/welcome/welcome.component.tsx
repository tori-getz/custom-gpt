import React from 'react';
import cls from './welcome.module.sass';
import { CreateChat } from '~/features/create-chat';
import { Button } from '~/shared/ui/buttons/button';
import { MdMenu } from 'react-icons/md';
import { setMenuOpened } from '../layout';

export const Welcome: React.FC = () => {
  return (
    <div className={cls.page}>
      <div className={cls.card}>
        <h1 className={cls.card__title}>CustomGPT</h1>
        <CreateChat />
        <span className={cls.card__divider}>или</span>
        <Button
          left={<MdMenu />}
          onClick={() => setMenuOpened(true)}
        >
          Откройте меню
        </Button>
      </div>
    </div>
  )
}
