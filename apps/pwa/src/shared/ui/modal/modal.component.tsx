import React, { PropsWithChildren } from "react";
import { Dialog } from '@headlessui/react';
import cn from 'classnames';
import cls from './modal.module.sass';

export interface IModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => any;
  title?: string;
  className?: string;
}

export const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={cls.dialog}
    >
      <div className={cls.backdrop} aria-hidden="true" />
      <div className={cls.container}>
        <Dialog.Panel
          className={cn(cls.panel, className)}
        >
          {title && (
            <Dialog.Title>{title}</Dialog.Title>
          )}
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
