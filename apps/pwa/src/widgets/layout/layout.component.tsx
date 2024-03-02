import React, { ReactNode } from "react";
import cls from './layout.module.sass';
import { Outlet } from "@tanstack/react-router";

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({
  children
}) => {
  return (
    <div className={cls.layout}>
      <aside className={cls.layout__aside}>
        {children}
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
