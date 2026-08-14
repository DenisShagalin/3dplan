import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  detectLocale,
  isSupportedLocale,
} from "./locales";

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;

  // An explicit choice wins, otherwise fall back to the browser languages.
  const locale = isSupportedLocale(cookieLocale)
    ? cookieLocale
    : (detectLocale((await headers()).get("accept-language")) ?? DEFAULT_LOCALE);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
