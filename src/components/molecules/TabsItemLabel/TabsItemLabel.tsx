import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import type React from 'react';
import { useState, type ReactNode, useMemo, type CSSProperties } from 'react';
import type { RightClickTags } from '@/hooks/useTabsState';
import { useTabsState } from '@/hooks/useTabsState';
import { useTabsChange } from '@/hooks/useTabsChange';

interface TabsItemLabelProps {
  pathKey: string;
  children: ReactNode;
  eventType?: 'click' | 'ContextMenu';
  className?: string;
  style?: CSSProperties;
}

const TabsItemLabel = (props: TabsItemLabelProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { menuItems } = useTabsState(props.pathKey, open);
  const { onTabsDropdownChange } = useTabsChange();

  const menuClick: MenuProps['onClick'] = (e) => {
    e.domEvent.stopPropagation();
    onTabsDropdownChange(e.key as RightClickTags['code'], props.pathKey);
  };

  const contentProps: React.DOMAttributes<HTMLDivElement> = useMemo(() => {
    if (props.eventType === 'click') {
      return {
        onClick: (e) => {
          e.preventDefault();
          setOpen(!open);
        },
      };
    } else {
      return {
        onContextMenu: (e) => {
          e.preventDefault();
          setOpen(!open);
        },
      };
    }
  }, [props.eventType]);

  return (
    <Dropdown
      open={open}
      menu={{
        items: menuItems,
        onClick: menuClick,
      }}
      onOpenChange={(visible) => !visible && setOpen(visible)}
    >
      <div className={props.className} style={props.style} {...contentProps}>
        {props.children}
      </div>
    </Dropdown>
  );
};

export default TabsItemLabel;
