import Image from "next/image";
import Link from "next/link";
import { Flex } from "antd";
import { useTranslations } from "next-intl";

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    style={{
      textDecoration: "unset",
      color: "inherit",
      fontFamily: "inherit",
      padding: "2px",
    }}
  >
    {label}
  </Link>
);

import "./footer.css";

export const Footer = () => {
  const t = useTranslations();
  return (
    <div className="footer">
      <div className="footer_block">
        <Image
          src="/logo_white.png"
          alt="white_logo"
          width={0}
          height={0}
          sizes="100wh"
          style={{
            width: "50%",
            height: "auto",
            marginBottom: "10px",
          }}
        />
        <Image
          src="/underlogo_text.png"
          alt="logo_text"
          width={0}
          height={0}
          sizes="100wh"
          style={{
            width: "90%",
            height: "auto",
          }}
        />
      </div>
      <div className="footer_block link_block">
        <Link href="/contact">office@3dplan.online</Link>
        <div>
          <Link href="https://www.facebook.com/profile.php?id=61566994239984">
            <Image
              src="/facebook.png"
              alt="facebook"
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: "35px",
                height: "auto",
              }}
            />
          </Link>
          <Link href="https://www.instagram.com/3dplan.online/">
            <Image
              src="/insta.png"
              alt="insta"
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: "35px",
                height: "auto",
              }}
            />
          </Link>
          <Link href="https://www.linkedin.com/in/3dplan-online-grafikservice-f%C3%BCr-immobilienmakler-35a489369/">
            <Image
              src="/linkedin.png"
              alt="linkedin"
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: "35px",
                height: "auto",
              }}
            />
          </Link>
          <Link href="https://pinterest.com/3dplan_online">
            <Image
              src="/pinterest.png"
              alt="pinterest"
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: "35px",
                height: "auto",
              }}
            />
          </Link>
          <Link href="https://www.youtube.com/@3Dplan.online">
            <Image
              src="/youtube.png"
              alt="youtube"
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: "35px",
                height: "auto",
              }}
            />
          </Link>
          <Link href="https://www.xing.com/pages/3dplanonline">
            <Image
              src="/xing.png"
              alt="xing"
              width={0}
              height={0}
              sizes="100wh"
              style={{
                width: "35px",
                height: "auto",
              }}
            />
          </Link>
        </div>
      </div>
      <div
        className="footer_block"
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          textAlign: 'center'
        }}
      >
        <Flex
          style={{ fontFamily: "inherit", fontSize: "0.875rem" }}
          vertical
          align="center"
        >
          <FooterLink href="/security/privacy" label={t("policyLabels.privacy")} />
          <FooterLink href="/security/legal-notice" label={t("policyLabels.legalNotice")} />
          <FooterLink href="/security/terms" label={t("policyLabels.terms")} />
          <FooterLink href="/security/info" label={t("policyLabels.info")} />
        </Flex>
      </div>
    </div>
  );
};
