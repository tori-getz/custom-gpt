import React from 'react';
import { ButtonBase, ButtonType, IButtonBaseProps } from '../button-base';
import cn from 'classnames';
import cls from './icon-button.module.sass';

export interface IIconButtonProps extends IButtonBaseProps {
  size?: number;
  icon: React.FC<{ size: number }>
}

export const IconButton: React.FC<IIconButtonProps> = ({
  icon: Icon,
  size = 40,
  className,
  type = ButtonType.Normal,
  withShadow = type === ButtonType.Normal,
  ...rest
}) => {
  return (
    <ButtonBase
      className={cn(cls.button, className)}
      style={{
        width: size,
        height: size
      }}
      type={type}
      withShadow={withShadow}
      {...rest}
    >
      <Icon size={size / 2} />
    </ButtonBase>
  );
};
