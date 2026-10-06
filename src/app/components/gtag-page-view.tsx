"use client";

import { useEffect, useRef } from "react";
// The raw Next hook on purpose: the page_view needs the real URL change, and
// the locale-aware one strips the prefix, so /contact -> /de/contact would not
// register as a navigation.
import { usePathname } from "next/navigation";
import { trackPageView } from "@/app/utils/gtag";

export const GtagPageView = () => {
  const pathname = usePathname();
  // Starts at the landing path, which gtag("config") in the layout already
  // counted. Comparing paths also survives StrictMode's double effect in dev.
  const lastTracked = useRef(pathname);

  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    trackPageView();
  }, [pathname]);

  return null;
};
