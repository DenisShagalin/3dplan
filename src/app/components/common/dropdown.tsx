'use client'

import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown as AntdDropdown } from 'antd';

export const Dropdown = ({
  children,
  items,
  onClick,
  placement = 'bottom',
  rootClassName,
  selectedKeys,
}: {
  children: React.JSX.Element;
  items: MenuProps['items'];
  onClick: (value: string) => void;
  placement?: 'bottomLeft' | 'bottom' | 'bottomRight',
  // Class on the popup, e.g. "ui_dropdown" from globals.css
  rootClassName?: string;
  // Highlighted items, e.g. the current page or language
  selectedKeys?: string[];
}) => (
  <AntdDropdown
    menu={{
      items,
      onClick: ({ key }: { key: string }) => onClick(key),
      selectable: !!selectedKeys,
      selectedKeys,
    }}
    placement={placement}
    rootClassName={rootClassName}
  >
    {children}
  </AntdDropdown>
);
