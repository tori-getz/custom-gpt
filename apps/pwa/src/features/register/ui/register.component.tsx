import React, { useMemo, useState } from 'react';
import { Button } from '~/shared/ui/buttons/button';
import { Input } from '~/shared/ui/input';
import cls from './register.module.sass';
import { MdKey, MdLogin, MdPerson } from 'react-icons/md';
import { toast } from 'react-toastify';
import { register } from '../api';

export const Register: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>();

  const isValid = useMemo(() => {
    if (login === '') return false;
    if (password === '') return false;
    if (password !== repeatPassword) return false;

    return true;
  }, [login, password, repeatPassword]);

  const onConfirm = async () => {
    setLoading(true);

    try {
      await register(login, password);

      toast.success('Аккаут успешно зарегистрирован')
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cls.register}>
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
      <Input
        type='password'
        placeholder='Повторите пароль'
        left={<MdKey />}
        onChange={e => setRepeatPassword(e.target.value)}
      />
      <Button
        left={<MdLogin />}
        disabled={!isValid || loading}
        onClick={onConfirm}
      >
        Зарегистрироваться
      </Button>
    </div>
  );
};
