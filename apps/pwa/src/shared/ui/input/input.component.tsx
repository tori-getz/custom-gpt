import React, { ReactNode } from "react";
import cls from './input.module.sass';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  left?: ReactNode;
  right?: ReactNode;
}

export const Input: React.FC<IInputProps> = ({
  left,
  right,
  ...rest
}) => {
  return (
    <div className={cls.container}>
      {left}
      <input className={cls.container__input} {...rest} />
      {right}
    </div>
  );
};
