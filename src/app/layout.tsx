import "./globals.css";

import { ConfigProvider } from 'antd';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { Background } from "./components/background";
import { Section } from "./components/section";
import { Footer } from './components/footer';
import { MainLinks } from "./components/main-links";

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
        <title>2D & 3D Grundrisse online ab 25 € | 3dplan.online</title>
        <meta name='description' content='Digitale 2D/3D-Grundrisse ab 25 € online bestellen. Wohnflächenberechnung, Exposé-Grafiken, Digitalisierung alter Pläne. Hochwertige & professionell Grundriss visualisierung - 3dplan.online' />
        <meta name='keywords' content='2D Grundrisse online bestellen, 3D Grundrisse erstellen lassen, Grundriss Service ab 25 Euro, Wohnflächenberechnung online, Grundriss für Exposé, Digitalisierung Baupläne, alte Grundrisse digitalisieren, Grundriss Visualisierung, Immobilienpräsentation Grundriss, Architektenplan digital' />
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
