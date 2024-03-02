import React from 'react';
import cls from './welcome.module.sass';
import { CreateChat } from '~/features/create-chat';

export const Welcome: React.FC = () => {
  return (
    <div className={cls.page}>
      <div className={cls.card}>
        <h1 className={cls.card__title}>Gopnik GPT</h1>
        <CreateChat />
        <span className={cls.card__divider}>или</span>
        <p>выберите чат сбоку</p>
      </div>
    </div>
  )
}
