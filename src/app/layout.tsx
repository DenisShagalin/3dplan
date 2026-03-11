import "./globals.css";

import { ConfigProvider } from "antd";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { Background } from "./components/background";
import { Section } from "./components/section";
import { Footer } from "./components/footer";
import { MainLinks } from "./components/main-links";
import { CookiePopup } from "./components/cookie-popup";

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
        <link rel="icon" href="/favicon.png" sizes="any" />

        <title>2D & 3D Grundrisse online | 3dplan.online</title>
        <meta
          name="description"
          content="Grundriss für Immobilien Exposé. Grundriss für Immobilienverkauf. Immobilien Grundriss Service. Grundriss für Immobilienanzeige. Grundriss für Makler. Grundriss Service online. Grundriss erstellen lassen. Grundriss digitalisieren. 3D Grundriss Wohnung. 2D Grundriss mit Maßen. Grundriss für Immobilien Exposé. Grundriss erstellen Preis. Immobilien Visualisierung Grundriss. Professioneller Grundriss Immobilien"
        />
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
              },
            },
          }}
        >
          <NextIntlClientProvider messages={messages}>
            <Background src={["/background2.jpg"]} />
            <Section>
              <MainLinks />
              {children}
              <Footer />
            </Section>
            <CookiePopup />
          </NextIntlClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
