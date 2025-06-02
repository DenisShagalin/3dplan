import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { Flex } from 'antd';

export default function About() {
  const t = useTranslations();
  return (
    <Flex vertical align='center'>
      <img
        className='about_photo'
        src='/aboutus.jpg'
        alt='about us'
        style={{
          width: '70%',
        }}
      />
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
          {t('aboutus.title').toUpperCase()}
        </Title>

        <Paragraph
          style={{
            fontFamily: 'Calibri, sans-serif',
            fontSize: '18px',
            marginTop: '1rem',
            color: 'var(--main-grey-color)'
          }}
        >
          {t.rich('aboutus.description', {
            br: () => <br />,
            strong: (c) => <strong>{c}</strong>,
            a: (c) => <Link href='/contact'>{c}</Link>
          })}
        </Paragraph>
      </Flex>
    </Flex>
  );
}
