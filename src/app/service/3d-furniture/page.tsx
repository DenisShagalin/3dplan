'use client'

import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { Flex } from 'antd';
import { Carousel } from '../../components/common/carousel';
import { Slider } from '../../components/common/slider';
import { Steps } from '../../components/steps';
import { Accordion } from '../../components/common/accordion';
import { Price } from '../../components/common/price';
import { useState, useCallback } from 'react';
import { Order } from '@/app/components/order';
import useMedia from '@/app/components/common/media-hook';
import { Picture } from '@/app/components/picture';

const ImgWrap = ({ children }: any) => (
  <div className='image_wrap'>
    {children}
  </div>
);

const TextWrap = ({ children, style = {} }: { style?: React.CSSProperties, children: React.ReactNode }) => (
  <Text
    style={{
      fontFamily: 'Calibri, sans-serif',
      textAlign: 'center',
      color: 'var(--main-grey-color)',
      fontSize: '22px',
      ...style,
    }}
  >
    {children}
  </Text>
);

const images = [
  ['/3d-furniture/1.jpg', '/3d-furniture/2.jpg', '/3d-furniture/3.jpg'],
  ['/3d-furniture/4.jpg', '/3d-furniture/1.jpg', '/3d-furniture/6.jpg'],
  ['/3d-furniture/7.jpg', '/3d-furniture/8.jpg', '/3d-furniture/5.jpg'],
];

export default function Page() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [src, setSrc] = useState('');

  const t = useTranslations();
  const { isSmall } = useMedia();

  const onClick = useCallback((src: string) => () => {
    setSrc(src);
  }, []);

  return (
    <>
      <Picture src={src} open={!!src} setOpen={() => setSrc('')} />
      <Order open={isOpen} setOpen={setOpen} defaultValue='3dFurniture' />
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
          className='small_wrapper small_padding'
          style={{
            width: isSmall ? '80%' : '60%',
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
            {t('service.3dFurniture.title').toUpperCase()}
          </Title>

          <Paragraph
            style={{
              fontFamily: 'Calibri, sans-serif',
              fontSize: '18px',
              marginTop: '1rem',
              color: 'var(--main-grey-color)'
            }}
          >
            {t.rich('service.3dFurniture.description', {
              br: () => <br />,
            })}
          </Paragraph>

          <Flex style={{ width: isSmall ? '100%' : '80%', margin: '30px 0' }} justify='center'>
            <Price price={50} rooms='price.rooms1' />
            <Price price={100} rooms='price.rooms2' highlight />
            <Price price={150} rooms='price.rooms3' />
          </Flex>

          <Link href='' onClick={() => setOpen(true)}>
            <Text className='dark_link'>
              {t('service.3dFurniture.control')}
            </Text>
          </Link>
        </Flex>

        <Flex vertical align='flex-start' style={{ width: isSmall ? '80%' : '' }}>
          <TextWrap>
            {t('service.2dFurniture.listItem1')}
          </TextWrap>
          <TextWrap>
            {t('service.3dFurniture.listItem2')}
          </TextWrap>
          <TextWrap>
            {t('service.3dFurniture.listItem3')}
          </TextWrap>
          <TextWrap style={isSmall ? { textAlign: 'left' } : {}}>
            {t('service.3dFurniture.listItem4')}
          </TextWrap>
          <TextWrap style={{ margin: '20px 0' }}>
            {t('service.3dFurniture.listItem5')}
          </TextWrap>
        </Flex>

        <Steps
          title='service.3dFurniture.instructionTitle'
          steps={[
            'service.3dFurniture.step1',
            'service.3dFurniture.step2',
            'service.3dFurniture.step3'
          ]}
        />

        <Flex
          align='flex-start'
          justify='space-around'
          className='smal_wrapper'
          gap='middle'
          wrap
          style={{
            width: isSmall ? '80%' : '50%',
            marginBottom: '30px'
          }}
        >
          <Accordion title='service.3dFurniture.faq1title' description='service.3dFurniture.faq1description' />
          <Accordion title='service.3dFurniture.faq2title' description='service.3dFurniture.faq2description' />
          <Accordion title='service.3dFurniture.faq3title' description='service.3dFurniture.faq3description' />
          <Accordion title='service.3dFurniture.faq4title' description='service.3dFurniture.faq4description' />

        </Flex>

        <Slider
          left='/3d-furniture/slider1.jpg'
          right='/3d-furniture/slider2.jpg'
        />

      </Flex>
    </>
  );
}
