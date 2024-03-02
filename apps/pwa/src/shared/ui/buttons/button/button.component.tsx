import React, { ReactNode } from "react";
import { ButtonBase, IButtonBaseProps } from "../button-base";

export interface IButtonProps extends IButtonBaseProps {
  left?: ReactNode;
}

export const Button: React.FC<IButtonProps> = ({
  left,
  ...rest
}) => {
  return (
    <ButtonBase
      {...rest}
    >
      {left}
      {rest.children}
    </ButtonBase>
  );
};
