'use client'

import './accordion.css';

import { useState } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useTranslations } from 'next-intl';
import { Flex } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export const Accordion = ({
  title,
  description,
  style = {}
}: {
  title: string,
  description: string,
  style?: any
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const t = useTranslations();

  return (
    <div
      className='accordion'
      style={{
        ...style
      }}
    >
      <Flex
        vertical={false}
        align='center'
      >
        <Paragraph className='accordion_title'>{t(title)}</Paragraph>
        {isOpen ? (
          <UpOutlined onClick={() => setOpen(prev => !prev)} />
        ) : (
          <DownOutlined onClick={() => setOpen(prev => !prev)} />
        )}
      </Flex>
      {isOpen && (
        <Paragraph>{
          t.rich(description, {
            br: () => <br />,
            strong: (c) => <strong>{c}</strong>,
          })
        }</Paragraph>
      )}
    </div>
  )
};
