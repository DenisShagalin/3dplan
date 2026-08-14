import type { Metadata } from "next";
import { headers } from "next/headers";

import {
  DEFAULT_LOCALE,
  HREFLANG,
  PATHNAME_HEADER,
  SUPPORTED_LOCALES,
  type Locale,
} from "./locales";
import { getPathname } from "./navigation";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://3dplan.online";

const LOCALE_PREFIX = new RegExp(`^/(?:${SUPPORTED_LOCALES.join("|")})(?=/|$)`);

// hreflang has to list every language version of the page being rendered, so
// the path comes from the header the middleware set, stripped of its prefix:
// "/de/contact" -> "/contact".
export const getAlternates = async (
  locale: Locale,
): Promise<Metadata["alternates"]> => {
  const pathname = (await headers()).get(PATHNAME_HEADER) ?? "/";
  const href = pathname.replace(LOCALE_PREFIX, "") || "/";

  return {
    canonical: getPathname({ href, locale }),
    languages: {
      ...Object.fromEntries(
        SUPPORTED_LOCALES.map((supported) => [
          HREFLANG[supported],
          getPathname({ href, locale: supported }),
        ]),
      ),
      // Served to everyone whose language this site does not publish.
      "x-default": getPathname({ href, locale: DEFAULT_LOCALE }),
    },
  };
};
