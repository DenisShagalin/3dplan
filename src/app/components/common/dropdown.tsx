'use client'

import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown as AntdDropdown } from 'antd';

export const Dropdown = ({
  children,
  items,
  onClick,
  placement = 'bottom'
}: {
  children: React.JSX.Element;
  items: MenuProps['items'];
  onClick: (value: string) => void;
  placement?: 'bottomLeft' | 'bottom',
}) => (
  <AntdDropdown
    menu={{
      items,
      onClick: ({ key }: { key: string }) => onClick(key),
    }}
    placement={placement}
  >
    {children}
  </AntdDropdown>
);
