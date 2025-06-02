'use client'

import { Flex } from 'antd';
import Image from "next/image";
import { useTranslations } from 'next-intl';

import Paragraph from 'antd/lib/typography/Paragraph';
import useMedia from './common/media-hook';

interface IPeople {
  src: string;
  text: string;
  name: string;
  style?: React.CSSProperties;
  isSmall: boolean;
}

const People = ({
  src,
  text,
  name,
  style = {},
  isSmall,
}: IPeople) => (
  <div className='home_people_wrap'>
    {isSmall && <Image
        src={src}
        alt={name}
        width={100}
        height={0}
        style={{
          width: '100px',
          height: 'auto',
        }}
      />}
    <Flex vertical style={{ borderRight: '1px solid var(--main-biege-color)', padding: '0 25px', ...style }}>
      {!isSmall && <Image
        src={src}
        alt={name}
        width={100}
        height={0}
        style={{
          width: '100px',
          height: 'auto',
        }}
      />}
      <Paragraph style={{ fontFamily: 'Calibri, sans-serif' }}>{text}</Paragraph>
      <Paragraph style={{ fontFamily: 'Calibri, sans-serif', fontWeight: 'bold' }}>{name}</Paragraph>
    </Flex>
  </div>
);

export const Feedback = () => {
  const t = useTranslations();
  const { isSmall } = useMedia()
  return (
    <Flex className='home_feedbacks' justify='space-around'>
      <People
        src="/feedbacks/feedback1.png"
        name={t('feedback.thomas.name')}
        text={t('feedback.thomas.text')}
        isSmall={isSmall}
      />
      <People
        src="/feedbacks/feedback2.png"
        name={t('feedback.olga.name')}
        text={t('feedback.olga.text')}
        isSmall={isSmall}
      />
      <People
        src="/feedbacks/feedback3.png"
        name={t('feedback.sergio.name')}
        text={t('feedback.sergio.text')}
        isSmall={isSmall}
      />
      <People
        src="/feedbacks/feedback4.png"
        name={t('feedback.irina.name')}
        text={t('feedback.irina.text')}
        style={{ borderRight: 'unset' }}
        isSmall={isSmall}
      />
    </Flex>
  )
};

