import { Flex } from 'antd';
import Link from "next/link";
import { useTranslations } from 'next-intl';
import Text from 'antd/lib/typography/Text';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';

export const PlanExample = () => {
  const t = useTranslations();

  return (
    <Flex className='plan-example'>

      <img
        src='/plans/plan-example.jpg'
        alt='example'
      />

      <Flex
        vertical
        align='center'
        justify='center'
        style={{
          padding: '40px'
        }}
      >
        <Title
          style={{
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            color: 'var(--main-grey-color)',
          }}
          level={3}
        >
          {t('planExample.title').toUpperCase()}
        </Title>
        <Paragraph
          style={{
            fontFamily: 'Calibri, sans-serif',
            fontSize: '18px',
            marginTop: '1rem',
            color: 'var(--main-grey-color)',
          }}
        >
          {t.rich('planExample.description', {
            br: () => <br />,
          })}
        </Paragraph>
        <Link href='/service/3d-exterior/'>
          <Text className='dark_link'>{t('control.learnMore')}</Text>
        </Link>
      </Flex>

    </Flex>
  )
};
