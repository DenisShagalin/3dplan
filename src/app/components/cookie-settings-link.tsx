"use client";

import { useTranslations } from "next-intl";
import { openCookieSettings } from "@/app/utils/gtag";

// Withdrawing consent has to be as easy as giving it, so the footer offers
// the same dialog the banner does.
export const CookieSettingsLink = () => {
  const t = useTranslations("policyLabels");
  return (
    <button type="button" onClick={openCookieSettings}>
      {t("cookieSettings")}
    </button>
  );
};
