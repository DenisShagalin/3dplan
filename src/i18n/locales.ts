export const SUPPORTED_LOCALES = ["en", "de", "fr", "cz", "sk", "it"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "3DPLAN_LOCALE";

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// Browsers send the ISO code "cs" for Czech, the app stores it as "cz".
const LANGUAGE_ALIASES: Record<string, Locale> = {
  cs: "cz",
};

export const isSupportedLocale = (value?: string | null): value is Locale =>
  !!value && SUPPORTED_LOCALES.includes(value as Locale);

// Picks the most preferred supported language out of an Accept-Language
// header, e.g. "de-CH,de;q=0.9,cs;q=0.8" -> "de".
export const detectLocale = (acceptLanguage?: string | null) => {
  if (!acceptLanguage) {
    return undefined;
  }

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const quality = params
        .map((param) => param.trim())
        .find((param) => param.startsWith("q="))
        ?.slice(2);

      return {
        tag: tag.trim().toLowerCase(),
        quality: quality === undefined ? 1 : Number.parseFloat(quality),
      };
    })
    .filter(({ tag, quality }) => tag && quality > 0)
    .sort((a, b) => b.quality - a.quality)
    .map(({ tag }) => {
      // "de-CH" and "de" both mean German.
      const language = tag.split("-")[0];
      return LANGUAGE_ALIASES[language] ?? language;
    })
    .find(isSupportedLocale);
};

// The cookie needs an explicit path, otherwise it is scoped to the page the
// language was switched on and is not sent back on the other routes.
export const buildLocaleCookie = (locale: Locale) =>
  `${LOCALE_COOKIE}=${locale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};SameSite=Lax`;
