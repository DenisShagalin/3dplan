import "@/app/globals.css";

import { ConfigProvider } from "antd";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";

import { Background } from "@/app/components/background";
import { Section } from "@/app/components/section";
import { Footer } from "@/app/components/footer";
import { MainLinks } from "@/app/components/main-links";
import { CookiePopup } from "@/app/components/cookie-popup";
import { HREFLANG, isSupportedLocale } from "@/i18n/locales";
import { SITE_URL, getAlternates } from "@/i18n/metadata";

const TITLE = "2D & 3D Grundrisse online | 3dplan.online";
const DESCRIPTION =
  "Grundriss für Immobilien Exposé. Grundriss für Immobilienverkauf. Immobilien Grundriss Service. Grundriss für Immobilienanzeige. Grundriss für Makler. Grundriss Service online. Grundriss erstellen lassen. Grundriss digitalisieren. 3D Grundriss Wohnung. 2D Grundriss mit Maßen. Grundriss für Immobilien Exposé. Grundriss erstellen Preis. Immobilien Visualisierung Grundriss. Professioneller Grundriss Immobilien";

type LocaleParams = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return {
    // Turns the alternates below into the absolute URLs hreflang requires.
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description: DESCRIPTION,
    alternates: await getAlternates(locale),
  };
}

export default async function RootLayout({
  children,
  params,
}: LocaleParams & Readonly<{ children: React.ReactNode }>) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={HREFLANG[locale]}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18022087039"
        ></script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag() {
            // @ts-ignore
            window.dataLayer.push(arguments)
          }
          gtag('js', new Date());
          gtag('config', 'AW-18022087039');`}
        </Script>
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
          <NextIntlClientProvider locale={locale} messages={messages}>
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
