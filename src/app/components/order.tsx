'use client'

import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { Input, Flex, Typography, Button, Modal } from 'antd';
import { Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import { sendEmail } from '../utils/email';
import useMedia from './common/media-hook';

export function Order({
  open,
  setOpen,
  defaultValue,
}: {
  open: boolean
  setOpen: (b: boolean) => void;
  defaultValue: '2dDimension' | '2dFurniture' | '3dFurniture' | 'planBasic' | 'planPlus' | 'planPro'
}) {
  const [type, setType] = useState(defaultValue);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [city, setCity] = useState('');
  const [idx, setIdx] = useState('');
  const [link, setLink] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const t = useTranslations();

  const { isSmall } = useMedia();

  const [isLoading, setLoading] = useState(false);
  const [submitLabel, setSubmitLabel] = useState(t('control.submit'));

  const isActive = useMemo(() => (
    email.trim() &&
    firstName.trim() &&
    lastName.trim() &&
    org.trim() &&
    idx.trim() &&
    link.trim() &&
    type.trim() &&
    city.trim() &&
    address.trim()
  ), [email, firstName, lastName, org, idx, link, type, city]);

  const clear = useCallback(() => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
    setType(defaultValue);
    setOrg('')
    setCity('')
    setIdx('')
    setLink('')
    setAddress('')
    setMessage('')
  }, [defaultValue])

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await sendEmail({
        message: `
          Type: ${type}
          Name: ${firstName} ${lastName} - ${email}
          Organization: ${org}
          City: ${city}
          Postal Code: ${idx}
          Address: ${address}
          Link: ${link}
          -------------------------------
          ${message}
        `,
        subject: `Message from ${email}: ${firstName} ${lastName} - ${type}`,
      });
      setLoading(false);
      setSubmitLabel(t('control.wasSended'));
      clear();
      setTimeout(() => {
        setSubmitLabel(t('control.submit'));
        setLoading(false);
      }, 5000);
    } catch (e) {
      setLoading(false);
      setSubmitLabel(t('control.error'));
      clear();
      setTimeout(() => {
        setSubmitLabel(t('control.submit'));
      }, 5000);
    }
  }, [
    email, message, firstName, lastName, org, idx, link, type, clear
  ]);


  return (
    <Modal
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={open}
      onCancel={() => setOpen(false)}
      width={isSmall ? '100%' : '60%'}
      style={{
        backgroundColor: 'var(--main-biege-color)',
        maxWidth: isSmall ? undefined : '800px',
        padding: 0,
        margin: isSmall ? 0 : undefined,
        top: isSmall ? 0 : undefined,
        height: isSmall ? '100%' : undefined
      }}
      footer={null}
    >
      <Flex
        gap='small'
        align='flex-start'
        vertical
        style={{
          width: '100%',
          padding: 16,
          backgroundColor: 'var(--main-biege-color)',
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
              fontFamily: 'Calibri, sans-serif',
              color: 'var(--main-grey-color)',
              textAlign: 'center'
            }}
            level={4}
          >
            {t.rich('order.title', {
              br: () => <br />,
            })}
          </Title>

          <Paragraph
            style={{
              fontFamily: 'Calibri, sans-serif',
              fontSize: '18px',
              marginTop: '1rem',
              color: 'var(--main-grey-color)',
              textAlign: 'center'
            }}
          >
            {t.rich('order.description', {
              br: () => <br />,
            })}
          </Paragraph>
        </Flex>

        <Typography.Text>{t('order.type')} *</Typography.Text>
        <Select
          defaultValue={defaultValue}
          style={{
            width: '100%',
            background: '#ffffff',
            border: 'unset'
          }}
          onChange={(value) => setType(value)}
          options={[
            { value: '2dDimension', label: t('toolbar.servicesItems.2dDim') },
            { value: '2dFurniture', label: t('toolbar.servicesItems.2dFur') },
            { value: '3dFurniture', label: t('toolbar.servicesItems.3dFur') },
            // { value: '3dInterior', label: t('toolbar.servicesItems.3dIn') },
            // { value: '3dExterior', label: t('toolbar.servicesItems.3dEx') },
            { value: 'planBasic', label: t('toolbar.servicesItems.planBasic') },
            { value: 'planPlus', label: t('toolbar.servicesItems.planPlus') },
            { value: 'planPro', label: t('toolbar.servicesItems.planPro') },
          ]}
        />

        <Typography.Text>{t('order.link')} *</Typography.Text>
        <Input
          size='large'
          placeholder={t('order.link')}
          onChange={(e) => setLink(e.target.value)}
          value={link}
          style={{
            background: '#ffffff',
            border: 'unset'
          }}
        />

        <Typography.Text>{t('order.name')} *</Typography.Text>
        <Input
          size='large'
          placeholder={t('order.name')}
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          style={{
            background: '#ffffff',
            border: 'unset'
          }}
        />

        <Typography.Text>{t('order.surname')} *</Typography.Text>
        <Input
          size='large'
          placeholder={t('order.surname')}
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          style={{
            background: '#ffffff',
            border: 'unset'
          }}
        />

        <Typography.Text>{t('order.org')} *</Typography.Text>
        <Input
          size='large'
          placeholder={t('order.org')}
          onChange={(e) => setOrg(e.target.value)}
          value={org}
          style={{
            background: '#ffffff',
            border: 'unset'
          }}
        />

        <Typography.Text>{t('order.city')} *</Typography.Text>
        <Input
          size='large'
          placeholder={t('order.city')}
          onChange={(e) => setCity(e.target.value)}
          value={city}
          style={{
            background: '#ffffff',
            border: 'unset'
          }}
        />

        <Typography.Text>{t('order.idx')} *</Typography.Text>
        <Input
          size='large'
          placeholder={t('order.idx')}
          onChange={(e) => setIdx(e.target.value)}
          value={idx}
          style={{
            background: '#ffffff',
            border: 'unset'
          }}
        />

        <Typography.Text>{t('order.address')} *</Typography.Text>
        <Input
          size='large'
          placeholder={t('order.address')}
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          style={{
            background: '#ffffff',
            border: 'unset'
          }}
        />

        <Typography.Text>{t('order.mail')} *</Typography.Text>
        <Input
          size='large'
          placeholder={t('order.mail')}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          style={{
            background: '#ffffff',
            border: 'unset'
          }}
        />

        <Typography.Text>{t('order.comment')}</Typography.Text>
        <Input.TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          style={{
            background: '#ffffff',
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
    </Modal>
  );
};


