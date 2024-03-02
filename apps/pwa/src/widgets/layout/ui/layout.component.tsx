import React, { ReactNode, useCallback } from "react";
import cls from './layout.module.sass';
import { Outlet } from "@tanstack/react-router";
import { useBreakpoints } from "~/shared/hooks";
import Drawer from 'react-modern-drawer';
import { useUnit } from "effector-react";
import { $menuOpened, setMenuOpened } from "..";

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({
  children
}) => {
  const breakpoints = useBreakpoints();

  const menuOpened = useUnit($menuOpened);

  const renderMenu = useCallback(() => {
    if (breakpoints.isMobile) {
      return (
        <Drawer
          open={menuOpened}
          onClose={() => setMenuOpened(false)}
          direction='left'
        >
          {children}
        </Drawer>
      )
    }

    return (
      <aside className={cls.layout__aside}>
        {children}
      </aside>
    )
  }, [breakpoints.isMobile, children, menuOpened]);

  return (
    <div className={cls.layout}>
      {renderMenu()}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
