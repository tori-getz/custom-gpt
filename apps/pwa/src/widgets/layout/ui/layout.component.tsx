import React, { ReactNode, useCallback, useEffect } from "react";
import cls from './layout.module.sass';
import { Outlet } from "@tanstack/react-router";
import { useBreakpoints } from "~/shared/hooks";
import Drawer from 'react-modern-drawer';
import { useUnit } from "effector-react";
import { $menuOpened, setMenuOpened } from "..";
import { $accessToken } from "~/shared/networking/model";
import { router } from "~/app/routing";

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({
  children
}) => {
  const breakpoints = useBreakpoints();

  const menuOpened = useUnit($menuOpened);
  const accessToken = useUnit($accessToken);

  useEffect(() => {
    if (accessToken) return;

    router.navigate({ from: '/' });
  }, [accessToken]);

  const renderMenu = useCallback(() => {
    if (breakpoints.isMobile) {
      return (
        <Drawer
          open={menuOpened}
          onClose={() => setMenuOpened(false)}
          direction='left'
        >
          <aside className={cls.layout__aside}>
            {children}
          </aside>
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
