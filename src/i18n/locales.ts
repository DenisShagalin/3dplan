export const SUPPORTED_LOCALES = ["en", "de", "fr", "cz", "sk", "it"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "3DPLAN_LOCALE";

export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// The middleware puts the requested path here, because a server component has
// no other way of knowing which URL is being rendered.
export const PATHNAME_HEADER = "x-pathname";

// The site routes Czech as "cz", but "cs" is the ISO code browsers send and the
// only spelling Google accepts in hreflang, so both ends need a translation:
// "cs" coming in, "cs" going back out.
export const LANGUAGE_ALIASES: Record<string, Locale> = {
  cs: "cz",
};

export const HREFLANG: Record<Locale, string> = {
  en: "en",
  de: "de",
  fr: "fr",
  cz: "cs",
  sk: "sk",
  it: "it",
};

export const isSupportedLocale = (value?: string | null): value is Locale =>
  !!value && SUPPORTED_LOCALES.includes(value as Locale);
