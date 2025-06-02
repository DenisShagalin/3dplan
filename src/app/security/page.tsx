import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import { useTranslations } from 'next-intl';
import { Flex } from 'antd';

export default function Security() {
  const t = useTranslations();

  return (
    <Flex
      vertical
      align='center'
    >
      <Flex
        vertical
        className='smal_wrapper small_padding'
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
          {t('security.title').toUpperCase()}
        </Title>

        <Title
          style={{
            fontFamily: 'Calibri, sans-serif',
            color: 'var(--main-grey-color)'
          }}
          level={4}
        >
          {t('security.imprintTitle').toUpperCase()}
        </Title>

        <Paragraph
          style={{
            fontFamily: 'Calibri, sans-serif',
            fontSize: '18px',
            marginTop: '1rem',
            color: 'var(--main-grey-color)'
          }}
        >
          {t.rich('security.description', {
            br: () => <br />,
            strong: (c) => <strong>{c}</strong>,
            a: (c) => <a href='/'>{c}</a>
          })}
        </Paragraph>

        <Title
          style={{
            fontFamily: 'Calibri, sans-serif',
            color: 'var(--main-grey-color)'
          }}
          level={4}
        >
          {t('security.policyTitle').toUpperCase()}
        </Title>

        <Paragraph
          style={{
            fontFamily: 'Calibri, sans-serif',
            fontSize: '18px',
            marginTop: '1rem',
            color: 'var(--main-grey-color)'
          }}
        >
          {t.rich('security.policyDescription', {
            br: () => <br />,
            strong: (c) => <strong>{c}</strong>,
            a: (c) => <a href='https://www.dsb.gv.at'>{c}</a>
          })}
        </Paragraph>

      </Flex>
    </Flex>
  );
}
