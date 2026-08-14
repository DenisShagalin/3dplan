import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import {
  LANGUAGE_ALIASES,
  PATHNAME_HEADER,
  isSupportedLocale,
} from "./i18n/locales";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

// A leading segment shaped like a language tag: "/es", "/de-AT", "/pt-BR/price".
// The lookahead keeps it from matching real pages such as "/about".
const LEADING_LANGUAGE_TAG = /^\/([a-z]{2})(?:-[a-z]{2,4})?(?=\/|$)/i;

// An unsupported language in the URL falls back to the closest thing this site
// publishes rather than 404ing: "/pt/price" -> "/price", "/de-AT" -> "/de".
const resolveUnsupportedPrefix = (pathname: string) => {
  const match = pathname.match(LEADING_LANGUAGE_TAG);

  if (!match || isSupportedLocale(match[0].slice(1).toLowerCase())) {
    return undefined;
  }

  const language = match[1].toLowerCase();
  const locale = LANGUAGE_ALIASES[language] ?? language;
  const rest = pathname.slice(match[0].length);

  return isSupportedLocale(locale) ? `/${locale}${rest}` : rest || "/";
};

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const fallback = resolveUnsupportedPrefix(pathname);
  if (fallback) {
    // Temporary, so the URL is free to become valid if the locale is added.
    return NextResponse.redirect(new URL(fallback + search, request.url));
  }

  // Browsers send the ISO code "cs" for Czech, this app routes it as "cz", so
  // "cs-CZ,cs;q=0.9" has to be rewritten before the locale is matched.
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage?.includes("cs")) {
    request.headers.set(
      "accept-language",
      acceptLanguage.replace(/\bcs\b/g, "cz"),
    );
  }

  // next-intl forwards the request headers to the app, so the layout can read
  // the path back out and build the hreflang links from it.
  request.headers.set(PATHNAME_HEADER, pathname);

  return handleI18n(request);
}

export const config = {
  // Everything except the API routes, Next internals and the files in /public.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
