'use client'

import { Flex, Modal } from 'antd';
import useMedia from './common/media-hook';

export function Picture({
  open,
  setOpen,
  src,
}: {
  open: boolean
  setOpen: (b: boolean) => void;
  src: string;
}) {

  const { isSmall } = useMedia();

  return (
    <Modal
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={open}
      onCancel={() => setOpen(false)}
      width={isSmall ? '80%' : '60%'}
      style={{
        maxWidth: isSmall ? undefined : '800px',
        padding: 0,
      }}
      footer={null}
    >
      <Flex
        gap='small'
        align='flex-start'
        vertical
        style={{
          width: '100%',
        }}
      >
        <img src={src} style={{ width: '100%' }} />
      </Flex>
    </Modal>
  );
};


