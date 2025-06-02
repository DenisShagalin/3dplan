import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const supportedLocales = ['en', 'de', 'ru'];

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get('3DPLAN_LOCALE')?.value || 'en';

  let locale = cookieLocale;

  if (!supportedLocales.includes(locale)) {
    locale = 'en'
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
