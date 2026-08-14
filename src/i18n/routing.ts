import { defineRouting } from "next-intl/routing";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  SUPPORTED_LOCALES,
} from "./locales";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // English keeps the bare paths ("/contact"), every other locale is prefixed
  // ("/de/contact"), so the URLs that are already indexed stay valid.
  localePrefix: "as-needed",
  // Remembers an explicit pick from the language dropdown; it takes precedence
  // over the "accept-language" header on the next visit.
  localeCookie: {
    name: LOCALE_COOKIE,
    maxAge: LOCALE_COOKIE_MAX_AGE,
  },
  // The alternates are rendered as <link> tags by the layout instead, which
  // also lets Czech go out as "cs" rather than the invalid "cz".
  alternateLinks: false,
});
