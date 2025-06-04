'use client'

import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Flex } from 'antd';
import { Carousel } from '../../components/common/carousel';
import { Accordion } from '../../components/common/accordion';
import { Steps } from '../../components/steps';
import { useState, useCallback } from 'react';
import { Picture } from '@/app/components/picture';

const ImgWrap = ({ children }: any) => (
  <div className='image_wrap'>
    {children}
  </div>
);

const images = [
  ['/3dexterior/1.jpg', '/3dexterior/2.jpg', '/3dexterior/3.jpg'],
  ['/3dexterior/4.jpg', '/3dexterior/5.jpg', '/3dexterior/6.jpg'],
  ['/3dexterior/7.jpg', '/3dexterior/8.jpg', '/3dexterior/9.jpg'],
  ['/3dexterior/10.jpg', '/3dexterior/11.jpg', '/3dexterior/12.jpg'],
];

export default function Page() {
  const t = useTranslations();

  const [src, setSrc] = useState('');

  const onClick = useCallback((src: string) => () => {
    setSrc(src);
  }, []);

  return (
    <>
      <Picture src={src} open={!!src} setOpen={() => setSrc('')} />
      <Flex vertical align='center'>
        <Carousel loading={false}>
          {images.map((block, idx) => (
            <ImgWrap key={idx}>
              {block.map((src) => (
                <img key={src} src={src} alt={src} onClick={onClick(src)} />
              ))}
            </ImgWrap>
          ))}
        </Carousel>
        <Flex
          vertical
          align='center'
          className='small_padding smal_wrapper'
          style={{
            width: '60%',
            backgroundColor: 'var(--main-white-color)',
            padding: '40px',
            margin: '50px 0',
          }}
        >
          <Title
            style={{
              fontFamily: 'Arial, sans-serif',
              textAlign: 'center',
              color: 'var(--main-grey-color)'
            }}
            level={2}
          >
            {t('service.3dExterior.title').toUpperCase()}
          </Title>

          <Paragraph
            style={{
              fontFamily: 'Calibri, sans-serif',
              fontSize: '18px',
              marginTop: '1rem',
              color: 'var(--main-grey-color)'
            }}
          >
            {t.rich('service.3dExterior.description', {
              br: () => <br />,
            })}
          </Paragraph>
          <Link href='/contact'>
            <Text className='dark_link'>
              {t('service.3dExterior.control')}
            </Text>
          </Link>
        </Flex>

        <Steps
          title='service.3dExterior.instructionTitle'
          steps={[
            'service.3dExterior.step1',
            'service.3dExterior.step2',
            'service.3dExterior.step3'
          ]}
        />

        <Flex
          align='flex-start'
          justify='space-around'
          className='smal_wrapper'
          gap='middle'
          wrap
          style={{
            width: '50%',
            marginBottom: '30px'
          }}
        >
          <Accordion title='service.3dExterior.faq1title' description='service.3dExterior.faq1description' />
          <Accordion title='service.3dExterior.faq2title' description='service.3dExterior.faq2description' />
          <Accordion title='service.3dExterior.faq3title' description='service.3dExterior.faq3description' />
          <Accordion title='service.3dExterior.faq4title' description='service.3dExterior.faq4description' />

        </Flex>

      </Flex>
    </>
  );
}
