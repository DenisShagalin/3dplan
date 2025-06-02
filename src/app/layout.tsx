import { ConfigProvider } from 'antd';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { Background } from "./components/background";
import { Section } from "./components/section";
import { Footer } from './components/footer';
import { MainLinks } from "./components/main-links";

import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name='description' content='3Dplan.online' />
        <meta name='keywords' content='3Dplan.online' />
        <title>3Dplan.online</title>
      </head>
      <body>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                borderRadiusLG: 4,
                lineHeight: 2,
              },
              Dropdown: {
                borderRadiusLG: 0,
              }
            }
          }}
        >
          <NextIntlClientProvider messages={messages}>
            <Background src={['/background.jpg']} />
            <Section>
              <MainLinks />
              {children}
              <Footer />
            </Section>
          </NextIntlClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
