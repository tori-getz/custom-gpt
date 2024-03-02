import React, { useEffect } from "react";
import { MdExitToApp, MdPerson } from "react-icons/md";
import cls from './user-card.module.sass';
import { IconButton } from "~/shared/ui/buttons/icon-button";
import { setAccessToken } from "~/shared/networking/model";
import { useUnit } from "effector-react";
import { getUserQuery } from "..";
import { Spinner } from "~/shared/ui/spinner";

export const UserCard: React.FC = () => {
  const { data: user, pending } = useUnit(getUserQuery);

  useEffect(() => {
    getUserQuery.start();
  }, [])

  if (pending) {
    return (
      <Spinner />
    )
  }

  return (
    <div className={cls.card}>
      <div className={cls.card__avatar}>
        <MdPerson />
      </div>
      <p className={cls.card__title}>
        {user?.name}
      </p>
      <IconButton
        icon={MdExitToApp}
        onClick={() => setAccessToken('')}
      />
    </div>
  )
}
