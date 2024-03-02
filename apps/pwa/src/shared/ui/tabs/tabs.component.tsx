import React, { useCallback, useState } from "react";
import { ITab } from "./tabs.types";
import cn from 'classnames';
import cls from './tabs.module.sass';

interface ITabsProps {
  tabs: Array<ITab>;
}

export const Tabs: React.FC<ITabsProps> = ({
  tabs,
}) => {
  const [selectedTab, setSelectedTab] = useState<ITab>(tabs[0]);

  const renderTabs = useCallback(() => {
    return tabs.map((tab) => (
      <button
        key={tab.title}
        className={cn(
          cls.tabs__item,
          { [cls.tabs__item_active]: tab === selectedTab, },
        )}
        onClick={() => setSelectedTab(tab)}
      >
        {tab.title}
      </button>
    ));
  }, [tabs, selectedTab])

  return (
    <>
      <div className={cls.tabs}>
        {renderTabs()}
      </div>
      {selectedTab.component}
    </>
  )
};
