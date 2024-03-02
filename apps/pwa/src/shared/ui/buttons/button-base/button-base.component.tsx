import React from "react";
import cls from './button-base.module.sass';
import { ButtonType } from "./button-type.enum";
import { match } from 'ts-pattern';
import cn from 'classnames';

export interface IButtonBaseProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  withShadow?: boolean;
  disabled?: boolean;
}

export const ButtonBase: React.FC<IButtonBaseProps> = ({
  type = ButtonType.Normal,
  className,
  withShadow = true,
  ...rest
}) => {
  return (
    <button
      className={cn(
        cls.button,
        getButtonType(type),
        { [cls.button__shadow]: withShadow },
        className
      )}
      {...rest}
    >
      {rest.children}
    </button>
  )
}

export const getButtonType = (type: ButtonType) =>
  match<ButtonType>(type)
    .with(ButtonType.Normal, () => cls.button__normal)
    .with(ButtonType.Transparent, () => cls.button__transparent)
    .otherwise(() => '');
