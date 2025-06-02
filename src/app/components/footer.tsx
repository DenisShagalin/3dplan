import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

import Paragraph from 'antd/lib/typography/Paragraph';

import './footer.css';

export const Footer = () => {
  const t = useTranslations();
  return (
    <div className="footer">
      <div className="footer_block">
        <Image
          src='/logo_white.png'
          alt="white_logo"
          width={0}
          height={0}
          sizes="100wh"
          style={{
            width: '50%',
            height: 'auto',
            marginBottom: '10px'
          }}
        />
        <Image
          src='/underlogo_text.png'
          alt="logo_text"
          width={0}
          height={0}
          sizes="100wh"
          style={{
            width: '90%',
            height: 'auto',
          }}
        />
      </div>
      <div className="footer_block link_block">
        <Link href='/contact'>office@3dplan.online</Link>
        <div>
          <Link href='https://www.facebook.com/profile.php?id=61566994239984'>
            <Image
              src='/facebook.png'
              alt="facebook"
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: '35px',
                height: 'auto',
              }}
            />
          </Link>
          <Link href='https://www.instagram.com/3dplan.online/'>
            <Image
              src='/insta.png'
              alt="insta"
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: '35px',
                height: 'auto',
              }}
            />
          </Link>
          <Link href=''>
            <Image
              src='/linkedin.png'
              alt="linkedin"
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: '35px',
                height: 'auto',
              }}
            />
          </Link>
          <Link href='https://pinterest.com/3dplan_online'>
            <Image
              src='/pinterest.png'
              alt="pinterest"
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: '35px',
                height: 'auto',
              }}
            />
          </Link>
        </div>
      </div>
      <div
        className="footer_block"
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}
      >
        <Paragraph style={{ color: 'inherit', fontFamily: 'inherit' }}>
          <Link href='/security' style={{ textDecoration: 'unset', color: 'inherit', fontFamily: 'inherit' }}>
            {t('securityMessage')}
          </Link>
        </Paragraph>
      </div>
    </div>
  )
};
