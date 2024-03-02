import React, { useMemo } from "react"
import { ITab, Tabs } from "~/shared/ui/tabs"
import cls from './auth-modal.module.sass';
import { Register } from "~/features/register";
import { Login } from "~/features/login";

export const AuthModal: React.FC = () => {
  const tabs: Array<ITab> = useMemo(() => {
    return [
      {
        title: 'Вход',
        component: <Login />
      },
      {
        title: 'Регистрация',
        component: <Register />
      },
    ];
  }, []);

  return (
    <div className={cls.card}>
      <Tabs tabs={tabs} />
    </div>
  );
};
