'use client'

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";
import { MenuOutlined } from '@ant-design/icons';
import { Dropdown } from './common/dropdown';

import './main-links.css';
import useMedia from "./common/media-hook";

const supportedLocales = ['en', 'de', 'ru'];

export const MainLinks = () => {
  const [locale, setLocale] = useState<string>('en');
  const router = useRouter();
  const t = useTranslations();

  const { isSmall } = useMedia();

  useEffect(() => {
    const cookieLocale = document.cookie
      .split('; ')
      .find(r => r.startsWith('3DPLAN_LOCALE='))
      ?.split('=')?.[1];

    if (cookieLocale && supportedLocales.includes(cookieLocale)) {
      setLocale(cookieLocale);
    } else {
      setLocale('en');
      document.cookie = `3DPLAN_LOCALE=en;`;
      router.refresh();
    }

  }, [router]);

  const serviceItems = [
    {
      key: '/service/2d-dimension',
      label: t('toolbar.servicesItems.2dDim')
    },
    {
      key: '/service/2d-furniture',
      label: t('toolbar.servicesItems.2dFur')
    },
    {
      key: '/service/3d-furniture',
      label: t('toolbar.servicesItems.3dFur')
    },
    {
      key: '/service/3d-exterior/',
      label: t('toolbar.servicesItems.3dIn')
    },
    {
      key: '/service/3d-exterior',
      label: t('toolbar.servicesItems.3dEx')
    },
  ];

  const main = [
    {
      key: '/price',
      label: t('toolbar.pricing')
    },
    {
      key: '/about',
      label: t('toolbar.about')
    },
    {
      key: '/contact',
      label: t('toolbar.contact')
    },
  ];

  const lang = [
    {
      key: 'en',
      label: 'EN'
    },
    {
      key: 'de',
      label: 'DE'
    },
    {
      key: 'ru',
      label: 'RU'
    },
  ];

  const items = [
    ...serviceItems,
    ...main,
    {
      key: '1',
      type: 'group',
      label: 'Lang',
      className: 'group_link',
      children: lang,
    },
  ];

  const changeLocale = (locale: string) => {
    setLocale(locale);
    document.cookie = `3DPLAN_LOCALE=${locale};`;
    router.refresh();
  };

  const onClick = useCallback((href: any) => {
    if (
      href === 'en' ||
      href === 'de' ||
      href === 'ru'
    ) {
      changeLocale(href);
      return;
    }
    router.push(href);
  }, [router])

  return (
    <div className="top_toolbar">
      <div
        className="main-links"
        style={isSmall ? {
          width: '90%',
          padding: '20px',
          justifyContent: 'space-between'
        } : {}}
      >
        <Link href='/'>
          <Image
            src='/logo_small.png'
            alt="small_logo"
            className="toolbar_logo"
            priority
            width={100}
            height={0}
            style={{
              width: 'auto',
              height: 'auto',
            }}
          />
        </Link>

        {!isSmall ? (
          <>
            <Dropdown items={serviceItems} onClick={(href) => router.push(href)}>
              <Link href=''>{t('toolbar.services').toLocaleUpperCase()}</Link>
            </Dropdown>

            <Link href='/price'>{t('toolbar.pricing').toLocaleUpperCase()}</Link>
            <Link href='/about'>{t('toolbar.about').toLocaleUpperCase()}</Link>
            <Link href='/contact'>{t('toolbar.contact').toLocaleUpperCase()}</Link>

            <Dropdown items={lang} onClick={changeLocale}>
              <Link href=''>{locale.toUpperCase()}</Link>
            </Dropdown>
          </>
        ) : (

          <Dropdown
            // @ts-ignore
            items={items}
            onClick={onClick}
            placement='bottomLeft'
          >
            <MenuOutlined />
          </Dropdown>


        )}



      </div>

    </div>
  )
};
