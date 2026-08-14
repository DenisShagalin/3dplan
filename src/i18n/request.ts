import { getRequestConfig } from "next-intl/server";

import { DEFAULT_LOCALE, isSupportedLocale } from "./locales";

export default getRequestConfig(async ({ requestLocale }) => {
  // The "[locale]" segment the middleware resolved. It can still be missing or
  // bogus when a request reaches a page without passing the middleware.
  const requested = await requestLocale;
  const locale = isSupportedLocale(requested) ? requested : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
