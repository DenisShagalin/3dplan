'use client'

import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { Input, Flex, Typography, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import { sendEmail } from '../utils/email';
import useMedia from '../components/common/media-hook';

export default function Mail() {
  const t = useTranslations();

  const { isSmall } = useMedia();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [submitLabel, setSubmitLabel] = useState(t('control.submit'));
  const [isLoading, setLoading] = useState(false);

  const isActive = useMemo(() => (
    email.trim() && message.trim() && firstName.trim() && lastName.trim()
  ), [email, message, firstName, lastName]);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await sendEmail({
        message,
        subject: `Message from ${email}: ${firstName} ${lastName}`,
      });
      setLoading(false);
      setSubmitLabel(t('control.wasSended'));
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setTimeout(() => {
        setSubmitLabel(t('control.submit'));
        setLoading(false);
      }, 5000);
    } catch (e) {
      setLoading(false);
      setSubmitLabel(t('control.error'));
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setTimeout(() => {
        setSubmitLabel(t('control.submit'));
      }, 5000);
    }
  }, [
    email,
    firstName,
    lastName,
    message,
  ]);

  return (

    <Flex
      gap='middle'
      align='flex-start'
      vertical
      className='smal_wrapper small_padding'
      style={{
        width: '70%',
        maxWidth: '800px',
        margin: '16px auto',
        padding: 16,
        background: '#ffffff',
      }}
    >
      <Flex
        vertical
        justify='center'
        align='center'
        style={{
          width: '100%'
        }}
      >
        <Title
          style={{
            fontFamily: 'Arial, sans-serif',
            color: 'var(--main-grey-color)',
            textAlign: 'center'
          }}
          level={4}
        >
          {t.rich('mailForm.title', {
            br: () => <br />,
          })}
        </Title>

        <Paragraph
          style={{
            fontFamily: 'Calibri, sans-serif',
            fontSize: isSmall ? '14px' : '18px',
            marginTop: '1rem',
            color: 'var(--main-grey-color)',
            textAlign: 'center'
          }}
        >
          {t.rich('mailForm.description', {
            br: () => <br />,
          })}
        </Paragraph>
      </Flex>


      <Flex
        gap='middle'
        align='flex-start'
        vertical={isSmall ? true : undefined}
        style={{
          width: '100%'
        }}
      >
        <Flex
          vertical
          style={{
            width: '100%'
          }}
        >
          <Typography.Text>{t('mailForm.name')} *</Typography.Text>
          <Input
            size='large'
            placeholder={t('mailForm.firstName')}
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            style={{
              backgroundColor: 'var(--main-biege-color)',
              border: 'unset'
            }}
          />
        </Flex>
        <Flex
          vertical
          style={{
            width: '100%'
          }}
        >
          <Typography.Text>{t('mailForm.lastName')} *</Typography.Text>
          <Input
            size='large'
            placeholder={t('mailForm.lastName')}
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            style={{
              backgroundColor: 'var(--main-biege-color)',
              border: 'unset'
            }}
          />
        </Flex>

      </Flex>

      <Typography.Text>{t('mailForm.email')} *</Typography.Text>
      <Input
        size='large'
        placeholder={t('mailForm.email')}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        style={{
          backgroundColor: 'var(--main-biege-color)',
          border: 'unset'
        }}
      />

      <Typography.Text>{t('mailForm.message')} *</Typography.Text>
      <Input.TextArea
        autoSize={{ minRows: 5, maxRows: 10 }}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        style={{
          backgroundColor: 'var(--main-biege-color)',
          border: 'unset'
        }}
      />
      <Flex
        justify='center'
        align='center'
        style={{
          width: '100%'
        }}
      >
        <Button
          onClick={onSubmit}
          disabled={!isActive}
          loading={isLoading}
          style={{
            backgroundColor: 'grey',
            color: 'white',
          }}
        >
          {submitLabel}
        </Button>
      </Flex>
    </Flex>
  );
};


