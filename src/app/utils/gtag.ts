// Google Ads tag. The bootstrap script in the layout defines window.gtag
// before the page hydrates, so calls made from effects are queued in
// dataLayer even while gtag.js is still downloading.

export const GOOGLE_ADS_ID = "AW-18022087039";

// Where the cookie banner remembers the visitor's choice. The layout's inline
// bootstrap reads the same key, so it lives here rather than in the banner.
const COOKIE_CONSENT_KEY = "3DPLAN_LOCALE_cookie_consent";

// The choice is asked again after this long, as GDPR guidance recommends.
const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 183;

type ConsentValue = "accepted" | "declined";

// Stored as {"value":"accepted","at":<ms>}. Anything else, including the old
// bare "accepted"/"declined" strings, counts as no choice and is asked again.
export const readConsent = (): ConsentValue | null => {
  try {
    const { value, at } = JSON.parse(
      localStorage.getItem(COOKIE_CONSENT_KEY) ?? "null",
    ) ?? {};
    const isFresh =
      typeof at === "number" && Date.now() - at < CONSENT_MAX_AGE_MS;
    return isFresh && (value === "accepted" || value === "declined")
      ? value
      : null;
  } catch {
    // Unparseable (old format) or storage blocked.
    return null;
  }
};

export const saveConsent = (granted: boolean) => {
  try {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ value: granted ? "accepted" : "declined", at: Date.now() }),
    );
  } catch {
    // Storage blocked: the choice still applies to this page view.
  }
  updateConsent(granted);
};

// Conversion labels from Google Ads (Goals → Conversions → Tag setup).
// An empty label is skipped, so a conversion can be wired up before it exists.
const CONVERSION_LABELS: Record<"order" | "contact", string> = {
  // Previously fired on every price page view.
  order: "htcLCJ7W46scEP_yzJFD",
  contact: "",
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const gtag = (...args: unknown[]) => {
  if (typeof window !== "undefined") {
    window.gtag?.(...args);
  }
};

const consentState = (granted: boolean) => {
  const value = granted ? "granted" : "denied";
  return {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  };
};

// Runs inline in <head>, before anything else touches gtag: everything stays
// denied (Consent Mode v2) unless the visitor accepted cookies earlier.
export const GTAG_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag("consent", "default", ${JSON.stringify(consentState(false))});
gtag("set", "ads_data_redaction", true);
try {
  var stored = JSON.parse(localStorage.getItem(${JSON.stringify(COOKIE_CONSENT_KEY)}) || "null");
  if (
    stored && stored.value === "accepted" && typeof stored.at === "number" &&
    Date.now() - stored.at < ${CONSENT_MAX_AGE_MS}
  ) {
    gtag("consent", "update", ${JSON.stringify(consentState(true))});
  }
} catch (e) {}
gtag("js", new Date());
gtag("config", ${JSON.stringify(GOOGLE_ADS_ID)});
`;

export const updateConsent = (granted: boolean) =>
  gtag("consent", "update", consentState(granted));

// The initial page_view is sent by "config"; client-side navigations are not.
export const trackPageView = () =>
  gtag("event", "page_view", {
    send_to: GOOGLE_ADS_ID,
    page_location: window.location.href,
    page_title: document.title,
  });

export const trackConversion = (kind: keyof typeof CONVERSION_LABELS) => {
  const label = CONVERSION_LABELS[kind];
  if (label) {
    gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}` });
  }
};
