import "@/app/globals.css";

import { ConfigProvider } from "antd";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Background } from "@/app/components/background";
import { Section } from "@/app/components/section";
import { Footer } from "@/app/components/footer";
import { MainLinks } from "@/app/components/main-links";
import { CookiePopup } from "@/app/components/cookie-popup";
import { GtagPageView } from "@/app/components/gtag-page-view";
import { GOOGLE_ADS_ID, GTAG_BOOTSTRAP } from "@/app/utils/gtag";
import { HREFLANG, isSupportedLocale } from "@/i18n/locales";
import { SITE_URL, getAlternates } from "@/i18n/metadata";

type LocaleParams = Readonly<{ params: Promise<{ locale: string }> }>;

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    // Turns the alternates below into the absolute URLs hreflang requires.
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
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

        {/* Plain inline script, not next/script: it has to define gtag and
            the consent defaults before any component effect can call it. */}
        <script dangerouslySetInnerHTML={{ __html: GTAG_BOOTSTRAP }} />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
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
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Background src={["/background2.webp"]} />
            <Section>
              <MainLinks />
              {children}
              <Footer />
            </Section>
            <CookiePopup />
            <GtagPageView />
          </NextIntlClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
