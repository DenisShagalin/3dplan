'use client'

import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import Link from "next/link";
import Text from 'antd/lib/typography/Text';
import { useTranslations } from 'next-intl';
import { Flex } from 'antd';
import { PriceMini } from '../components/common/price-mini';
import { useState } from 'react';
import { Order } from '@/app/components/order';
import { Plan } from '../components/common/plan';
import useMedia from '../components/common/media-hook';

type OrderType = '2dDimension' | '2dFurniture' | '3dFurniture' | 'planBasic' | 'planPlus' | 'planPro' | '';

const ImgWrapper = ({
  src
}: {
  src: string
}) => (
  <div className=''>
    <img key={src} src={src} alt={src} style={{ width: '100%' }} />
  </div>
);

export default function Price() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderType>('');

  const { isSmall } = useMedia();

  const t = useTranslations();
  return (
    <>
      {order && isOpen && <Order open={isOpen} setOpen={setOpen} defaultValue={order} />}
      <Flex vertical>

        <Flex
          vertical={isSmall}
          align='center'
          justify='space-around'
          style={{
            marginBottom: '3rem'
          }}
        >
          <Flex
            wrap
            align='center'
            justify='center'
            style={{
              width: isSmall ? '80%' : '28%',
            }}
          >
            <ImgWrapper src='/2d-dimension/0.jpg' />

            <Title
              style={{
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                color: 'var(--main-grey-color)',
                width: '100%',
                margin: '5px'
              }}
              level={4}
            >
              {t('pricing.dimension.title').toUpperCase()}
            </Title>

            <Paragraph
              style={{
                fontFamily: 'Calibri, sans-serif',
                fontSize: '12px',
                marginTop: '1rem',
                color: 'var(--main-grey-color)',
                textAlign: 'center',
                margin: '5px'
              }}
            >
              {t.rich('pricing.dimension.description')}
            </Paragraph>
            <Flex
              style={{
                width: '100%',
                margin: '5px 0',
              }}
              justify='center'
            >
              <PriceMini price={25} rooms='price.rooms1' />
              <PriceMini price={50} rooms='price.rooms2' highlight />
              <PriceMini price={75} rooms='price.rooms3' />
            </Flex>

            <Link href='' style={{ marginTop: '1.5rem' }} onClick={() => {
              setOpen(true);
              setOrder('2dDimension');
            }}>
              <Text className='dark_link'>
                {t('service.2dFurniture.control')}
              </Text>
            </Link>
          </Flex>

          <Flex
            wrap
            align='center'
            justify='center'
            style={{
              width: isSmall ? '80%' : '28%',
              marginTop: isSmall ? '2rem' : undefined
            }}
          >
            <ImgWrapper src='/2d-furniture/1.jpg' />

            <Title
              style={{
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                color: 'var(--main-grey-color)',
                width: '100%',
                margin: '5px'
              }}
              level={4}
            >
              {t('pricing.furniture.title').toUpperCase()}
            </Title>

            <Paragraph
              style={{
                fontFamily: 'Calibri, sans-serif',
                fontSize: '12px',
                marginTop: '1rem',
                color: 'var(--main-grey-color)',
                textAlign: 'center',
                margin: '5px',
              }}
            >
              {t.rich('pricing.furniture.description', { br: () => <br /> })}
            </Paragraph>
            <Flex
              style={{
                width: '100%',
                margin: '5px 0',
              }}
              justify='center'
            >
              <PriceMini price={35} rooms='price.rooms1' />
              <PriceMini price={70} rooms='price.rooms2' highlight />
              <PriceMini price={105} rooms='price.rooms3' />
            </Flex>

            <Link href='' style={{ marginTop: '1.5rem' }} onClick={() => {
              setOrder('2dFurniture');
              setOpen(true);
            }}>
              <Text className='dark_link'>
                {t('service.2dFurniture.control')}
              </Text>
            </Link>
          </Flex>

          <Flex
            wrap
            align='center'
            justify='center'
            style={{
              width: isSmall ? '80%' : '28%',
              marginTop: isSmall ? '2rem' : undefined
            }}
          >
            <ImgWrapper src='/3d-furniture/8.jpg' />

            <Title
              style={{
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                color: 'var(--main-grey-color)',
                width: '100%',
                margin: '5px'
              }}
              level={4}
            >
              {t('pricing.3d.title').toUpperCase()}
            </Title>

            <Paragraph
              style={{
                fontFamily: 'Calibri, sans-serif',
                fontSize: '12px',
                marginTop: '1rem',
                color: 'var(--main-grey-color)',
                textAlign: 'center',
                margin: '5px'
              }}
            >
              {t.rich('pricing.3d.description', { br: () => <br /> })}
            </Paragraph>
            <Flex
              style={{
                width: '100%',
                margin: '5px 0',
              }}
              justify='center'
            >
              <PriceMini price={50} rooms='price.rooms1' />
              <PriceMini price={100} rooms='price.rooms2' highlight />
              <PriceMini price={150} rooms='price.rooms3' />
            </Flex>

            <Link href='' style={{ marginTop: '1.5rem' }} onClick={() => {
              setOpen(true);
              setOrder('3dFurniture');
            }}>
              <Text className='dark_link'>
                {t('service.2dFurniture.control')}
              </Text>
            </Link>
          </Flex>
        </Flex>

        <Flex
          vertical
          align='center'
          style={{
            backgroundColor: 'var(--main-white-color)'
          }}
        >
          <Title
            style={{
              fontFamily: 'Arial, sans-serif',
              textAlign: 'center',
              color: 'var(--main-grey-color)',
              width: '100%',
              marginTop: '3rem',
            }}
            level={4}
          >
            {t('packages.title')}
          </Title>

          <Paragraph
            style={{
              fontFamily: 'Calibri, sans-serif',
              fontSize: '18px',
              marginTop: '1rem',
              color: 'var(--main-grey-color)',
              textAlign: 'center',
              margin: '5px',
              width: isSmall ? '90%' : '80%'
            }}
          >
            {t.rich('packages.description', { br: () => <br /> })}
          </Paragraph>

          <Flex
            justify='space-between'
            style={{
              width: isSmall ? '100%' : '65%',
              margin: '2rem'
            }}
          >
            <Plan
              title={t('toolbar.servicesItems.planBasic')}
              text={t('toolbar.servicesItems.planBasicDes')}
              price={t('toolbar.servicesItems.planBasicDiscount')}
              info={t('toolbar.servicesItems.planBasicQuantity')}
              onClick={() => {
                setOpen(true);
                setOrder('planBasic');
              }}
              isSmall={isSmall}
            />
            <Plan
              title={t('toolbar.servicesItems.planPlus')}
              text={t('toolbar.servicesItems.planPlusDes')}
              price={t('toolbar.servicesItems.planPlusDiscount')}
              info={t('toolbar.servicesItems.planPlusQuantity')}
              onClick={() => {
                setOpen(true);
                setOrder('planBasic');
              }}
              isSmall={isSmall}
            />
            <Plan
              title={t('toolbar.servicesItems.planPro')}
              text={t('toolbar.servicesItems.planProDes')}
              price={t('toolbar.servicesItems.planProDiscount')}
              info={t('toolbar.servicesItems.planProQuantity')}
              onClick={() => {
                setOpen(true);
                setOrder('planPro');
              }}
              isSmall={isSmall}
            />
          </Flex>
        </Flex>

        <Flex vertical={isSmall} style={{ marginBottom: '2rem' }}>
          <Flex vertical align='center' style={{ width: isSmall ? '' : '50%' }}>
            <ImgWrapper src='/3dexterior/9.jpg' />
            <Title
              style={{
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                color: 'var(--main-grey-color)',
                width: '100%',
                margin: '5px'
              }}
              level={4}
            >
              {t('info.interior.title')}
            </Title>
            <Paragraph
              style={{
                fontFamily: 'Calibri, sans-serif',
                fontSize: '12px',
                marginTop: '1rem',
                color: 'var(--main-grey-color)',
                margin: '5px',
                width: isSmall ? '80%' : '60%'
              }}
            >
              {t.rich('info.interior.description', { br: () => <br /> })}
            </Paragraph>
            <Link href='/contact' style={{ marginTop: '1.5rem' }}>
              <Text className='dark_link'>
                {t('service.2dFurniture.control')}
              </Text>
            </Link>
          </Flex>

          <Flex vertical align='center' style={{
            width: isSmall ? '' : '50%',
            marginTop: isSmall ? '40px' : undefined
          }}>
            <ImgWrapper src='/3dexterior/11.jpg' />
            <Title
              style={{
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                color: 'var(--main-grey-color)',
                width: '100%',
                margin: '5px'
              }}
              level={4}
            >
              {t('info.exterior.title')}
            </Title>
            <Paragraph
              style={{
                fontFamily: 'Calibri, sans-serif',
                fontSize: '12px',
                marginTop: '1rem',
                color: 'var(--main-grey-color)',
                // textAlign: 'center',
                margin: '5px',
                width: isSmall ? '80%' : '60%'
              }}
            >
              {t.rich('info.exterior.description', { br: () => <br /> })}
            </Paragraph>
            <Link href='/contact' style={{ marginTop: '1.5rem' }}>
              <Text className='dark_link'>
                {t('service.2dFurniture.control')}
              </Text>
            </Link>
          </Flex>
        </Flex>

      </Flex>
    </>
  );
}
