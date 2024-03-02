import React, { useMemo, useState } from 'react';
import { Button } from '~/shared/ui/buttons/button';
import { Input } from '~/shared/ui/input';
import cls from './login.module.sass';
import { MdKey, MdLogin, MdPerson } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as api from '../api'
import { setAccessToken } from '~/shared/networking/model';
import { router } from '~/app/routing';

export const Login: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>();

  const isValid = useMemo(() => {
    if (login === '') return false;
    if (password === '') return false;

    return true;
  }, [login, password]);

  const onConfirm = async () => {
    setLoading(true);

    try {
      const { accessToken } = await api.login(login, password);
      toast.success('Вы авторизованы');
      setAccessToken(accessToken);
      router.navigate({ from: 'chats' });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cls.login}>
      <Input
        placeholder='Логин'
        left={<MdPerson />}
        onChange={e => setLogin(e.target.value)}
      />
      <Input
        placeholder='Пароль'
        type='password'
        left={<MdKey />}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        left={<MdLogin />}
        disabled={!isValid || loading}
        onClick={onConfirm}
      >
        Войти
      </Button>
    </div>
  );
};
