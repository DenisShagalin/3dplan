import { useTranslations } from 'next-intl';
import { Flex } from 'antd';

import Title from 'antd/lib/typography/Title';
import Link from "next/link";
import Text from 'antd/lib/typography/Text';


export const Plan = ({
  title,
  text,
  price,
  info,
  onClick,
  isSmall,
}: any) => {
  const t = useTranslations();
  return (
    <Flex
      vertical
      align='center'
      style={{
        backgroundColor: 'var(--main-biege-color)',
        color: 'var(--main-grey-color)',
        padding: '1rem',
        width: '25%'
      }}
    >
      <Title
        style={{
          color: 'var(--main-grey-color)',
          margin: '0'
        }}
        level={5}
      >
        {title}
      </Title>
      <Text
        style={{
          color: 'var(--main-grey-color)',
          fontSize: '10px',
          textAlign: 'center'
        }}
      >
        {text}
      </Text>
      <Title
        style={{
          color: 'var(--main-green-color)',
          margin: '0'
        }}
        level={isSmall ? 4 : 3}
      >
        {price}
      </Title>
      <Text
        style={{
          color: 'var(--main-grey-color)',
          fontSize: '14px'
        }}
      >
        {info}
      </Text>

      <Link
        href=''
        style={{
          marginTop: '1rem',
          fontSize: '12px',
          backgroundColor: 'var(--main-grey-color)',
          padding: '0 0.5rem'
        }}
        onClick={onClick}
      >
        <Text style={{
          color: 'var(--main-white-color)',
          fontSize: '16px',
          }}>{t('service.2dFurniture.control')}</Text>
      </Link>
    </Flex>
  )
};