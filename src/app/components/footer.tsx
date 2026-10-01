import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import "./footer.css";

const SOCIAL = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61566994239984",
    path: "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/3dplan.online/",
    path: "M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1.1-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2C2 15 2 14.7 2 12s0-3 .1-4.1c0-1.1.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4C8 2 8.3 2 11 2zm0 1.8c-2.7 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.3-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.3.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.3.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.3-.1-4-.1zm0 3.5a4.7 4.7 0 110 9.4 4.7 4.7 0 010-9.4zm0 1.8a2.9 2.9 0 100 5.8 2.9 2.9 0 000-5.8zm5.9-2a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z",
  },
  {
    title: "Pinterest",
    href: "https://pinterest.com/3dplan_online",
    path: "M12 2a10 10 0 00-3.6 19.3c0-.8 0-1.8.2-2.6l1.5-6.2s-.4-.8-.4-1.9c0-1.8 1-3.1 2.3-3.1 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.7-1 4.2-.3 1.2.6 2.3 1.9 2.3 2.2 0 3.9-2.4 3.9-5.7 0-3-2.1-5.1-5.2-5.1-3.5 0-5.6 2.6-5.6 5.4 0 1 .4 2.1.9 2.7.1.1.1.2.1.3l-.4 1.5c0 .2-.2.3-.4.2-1.4-.6-2.3-2.6-2.3-4.3 0-3.5 2.5-6.7 7.3-6.7 3.8 0 6.8 2.7 6.8 6.4 0 3.8-2.4 6.9-5.8 6.9-1.1 0-2.2-.6-2.6-1.3l-.7 2.7c-.3 1-1 2.3-1.4 3.1A10 10 0 1012 2z",
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@3Dplan.online",
    path: "M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 4 12 4 12 4s-3.9 0-6.7.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.7v1.6c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.9.8 2.3.9 1.7.2 7 .2 7 .2s3.9 0 6.7-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5zM9.9 14.6V8.9l5.4 2.9-5.4 2.8z",
  },
];

const LEGAL = [
  { href: "/security/privacy", key: "policyLabels.privacy" },
  { href: "/security/legal-notice", key: "policyLabels.legalNotice" },
  { href: "/security/terms", key: "policyLabels.terms" },
  { href: "/security/info", key: "policyLabels.info" },
];

export const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="footer">
      <div className="f_wrap">
        <div className="f_brand">
          <Image
            src="/logo_white.png"
            alt="3dplan.online"
            width={190}
            height={71}
            className="f_logo"
          />
          {/* Brand tagline, shown in German on every locale like the old image. */}
          <div className="f_tagline">Grafikservice für Immobilienmakler</div>
        </div>

        <div className="f_mid">
          <Link href="/contact" className="f_email">
            office@3dplan.online
          </Link>
          <div className="f_social">
            {SOCIAL.map(({ title, href, path }) => (
              <a
                key={title}
                href={href}
                title={title}
                aria-label={title}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <nav className="f_legal">
          {LEGAL.map(({ href, key }) => (
            <Link key={href} href={href}>
              {t(key)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
