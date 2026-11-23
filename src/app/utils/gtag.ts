// Google Ads tag. The bootstrap script in the layout defines window.gtag
// before the page hydrates, so calls made from effects are queued in
// dataLayer. gtag.js itself is loaded only after the visitor consents to
// statistics or marketing (Section 165 (3) TKG 2021): until then the queue
// never leaves the browser.

export const GOOGLE_ADS_ID = "AW-18022087039";
const GTAG_SRC = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
const GTAG_SCRIPT_ID = "gtag-js";

// Where the cookie banner remembers the visitor's choice. The layout's inline
// bootstrap reads the same key, so it lives here rather than in the banner.
const COOKIE_CONSENT_KEY = "3DPLAN_LOCALE_cookie_consent";

// The choice is asked again after this long, as GDPR guidance recommends.
const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 183;

// Fired by the footer's "Cookie settings" link; the banner listens for it.
const COOKIE_SETTINGS_EVENT = "3dplan:cookie-settings";

export type ConsentChoice = { statistics: boolean; marketing: boolean };

// Stored as {"v":2,"statistics":bool,"marketing":bool,"at":<ms>}. Anything
// else, including the old {"value","at"} record, counts as no choice and is
// asked again.
export const readConsent = (): ConsentChoice | null => {
  try {
    const { v, statistics, marketing, at } =
      JSON.parse(localStorage.getItem(COOKIE_CONSENT_KEY) ?? "null") ?? {};
    const isFresh =
      typeof at === "number" && Date.now() - at < CONSENT_MAX_AGE_MS;
    return v === 2 &&
      isFresh &&
      typeof statistics === "boolean" &&
      typeof marketing === "boolean"
      ? { statistics, marketing }
      : null;
  } catch {
    // Unparseable or storage blocked.
    return null;
  }
};

export const saveConsent = (choice: ConsentChoice) => {
  try {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({ v: 2, ...choice, at: Date.now() }),
    );
  } catch {
    // Storage blocked: the choice still applies to this page view.
  }
  updateConsent(choice);
  if (choice.statistics || choice.marketing) {
    loadGtag();
  }
  if (!choice.marketing) {
    clearAdCookies();
  }
};

export const openCookieSettings = () =>
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));

export const onOpenCookieSettings = (listener: () => void) => {
  window.addEventListener(COOKIE_SETTINGS_EVENT, listener);
  return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, listener);
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

const consentState = ({ statistics, marketing }: ConsentChoice) => {
  const ads = marketing ? "granted" : "denied";
  return {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: statistics ? "granted" : "denied",
  };
};

const NO_CONSENT: ConsentChoice = { statistics: false, marketing: false };

// Runs inline in <head>, before anything else touches gtag: everything stays
// denied (Consent Mode v2) and gtag.js is not even requested unless the
// visitor already consented to statistics or marketing.
export const GTAG_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag("consent", "default", ${JSON.stringify(consentState(NO_CONSENT))});
gtag("set", "ads_data_redaction", true);
gtag("js", new Date());
gtag("config", ${JSON.stringify(GOOGLE_ADS_ID)});
try {
  var stored = JSON.parse(localStorage.getItem(${JSON.stringify(COOKIE_CONSENT_KEY)}) || "null");
  if (
    stored && stored.v === 2 && typeof stored.at === "number" &&
    Date.now() - stored.at < ${CONSENT_MAX_AGE_MS} &&
    (stored.statistics === true || stored.marketing === true)
  ) {
    gtag("consent", "update", {
      ad_storage: stored.marketing ? "granted" : "denied",
      ad_user_data: stored.marketing ? "granted" : "denied",
      ad_personalization: stored.marketing ? "granted" : "denied",
      analytics_storage: stored.statistics ? "granted" : "denied"
    });
    var s = document.createElement("script");
    s.id = ${JSON.stringify(GTAG_SCRIPT_ID)};
    s.async = true;
    s.src = ${JSON.stringify(GTAG_SRC)};
    document.head.appendChild(s);
  }
} catch (e) {}
`;

// Same element the bootstrap adds for a returning visitor, so the id check
// keeps it to one copy.
const loadGtag = () => {
  if (document.getElementById(GTAG_SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = GTAG_SCRIPT_ID;
  script.async = true;
  script.src = GTAG_SRC;
  document.head.appendChild(script);
};

// Google Ads' first-party click and conversion cookies (_gcl_au, _gcl_aw,
// ...). gtag stops writing them once ad_storage is denied, but the ones
// already set would linger until they expire, so a withdrawal removes them.
const clearAdCookies = () => {
  const host = window.location.hostname;
  // Set on the registrable domain, e.g. ".3dplan.online", not the full host.
  const domains = ["", host, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name.startsWith("_gcl_"))
    .forEach((name) =>
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      }),
    );
};

export const updateConsent = (choice: ConsentChoice) =>
  gtag("consent", "update", consentState(choice));

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
