import { Flex } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import { useTranslations } from 'next-intl';

export const Us = () => {
  const t = useTranslations();
  return (
    <Flex
      className='home_us'
      justify='center'
      align='center'
    >

      <Flex
        justify='center'
        align='center'
        vertical
        className='us_text'
      >
        <Paragraph
          
          style={{
            fontFamily: 'Calibri, sans-serif',
            textAlign: 'center',
            fontSize: '1.125rem',
          }}
        >
          {t('home.usText1')}<br />
          {t('home.usText2')}<br />
          {t('home.usText3')}
        </Paragraph>
        <img
          src='/logo_small.png'
          alt='home'
        />
        <Title
          style={{
            textAlign: 'center',
            color: 'var(--main-grey-color)',
            fontFamily: 'Arial, sans-serif',
          }}
          level={2}
        >
          {t('home.usTitle').toUpperCase()}
        </Title>
      </Flex>

      <img
        src='/home_main.jpg'
        alt='home'
        style={{
          paddingLeft: '30px'
        }}
      />
    </Flex>
  )
};
