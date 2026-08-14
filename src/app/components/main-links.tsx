"use client";

import "./main-links.css";

import { useCallback } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown } from "./common/dropdown";
import useMedia from "./common/media-hook";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { isSupportedLocale } from "@/i18n/locales";

export const MainLinks = () => {
  // Resolved on the server from the URL prefix, the cookie or the browser.
  const locale = useLocale();
  // Without the locale prefix, so it can be re-rendered under another one.
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const { isSmall } = useMedia();

  const serviceItems = [
    {
      key: "/service/2d-dimension",
      label: t("toolbar.servicesItems.2dDim"),
    },
    {
      key: "/service/2d-furniture",
      label: t("toolbar.servicesItems.2dFur"),
    },
    {
      key: "/service/3d-furniture",
      label: t("toolbar.servicesItems.3dFur"),
    },
  ];

  const main = [
    {
      key: "/price",
      label: t("toolbar.pricing"),
    },
    {
      key: "/about",
      label: t("toolbar.about"),
    },
    {
      key: "/contact",
      label: t("toolbar.contact"),
    },
  ];

  const lang = [
    {
      key: "en",
      label: "EN",
    },
    {
      key: "de",
      label: "DE",
    },
    {
      key: "fr",
      label: "FR",
    },
    {
      key: "cz",
      label: "CZ",
    },
    {
      key: "sk",
      label: "SK",
    },
    {
      key: "it",
      label: "IT",
    },
  ];

  const items = [
    ...serviceItems,
    ...main,
    {
      key: "1",
      type: "group",
      label: "Lang",
      className: "group_link",
      children: lang,
    },
  ];

  // The dropdowns mix page links and language keys in one menu.
  const onClick = useCallback(
    (href: string) => {
      if (isSupportedLocale(href)) {
        // Same page, other language: "/price" -> "/de/price".
        router.replace(pathname, { locale: href });
        return;
      }
      router.push(href);
    },
    [pathname, router],
  );

  return (
    <div className="top_toolbar">
      <div
        className="main-links"
        style={
          isSmall
            ? {
                width: "90%",
                padding: "20px",
                justifyContent: "space-between",
              }
            : {}
        }
      >
        <Link href="/">
          <Image
            src="/logo_small.png"
            alt="small_logo"
            className="toolbar_logo"
            priority
            width={100}
            height={0}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </Link>

        {!isSmall ? (
          <>
            <Dropdown
              items={serviceItems}
              onClick={(href) => router.push(href)}
            >
              <Link href="">{t("toolbar.services").toLocaleUpperCase()}</Link>
            </Dropdown>

            <Link href="/price">
              {t("toolbar.pricing").toLocaleUpperCase()}
            </Link>
            <Link href="/about">{t("toolbar.about").toLocaleUpperCase()}</Link>
            <Link href="/contact">
              {t("toolbar.contact").toLocaleUpperCase()}
            </Link>

            <Dropdown items={lang} onClick={onClick}>
              <Link href="">{locale.toUpperCase()}</Link>
            </Dropdown>
          </>
        ) : (
          <Dropdown
            // @ts-ignore
            items={items}
            onClick={onClick}
            placement="bottomLeft"
          >
            <MenuOutlined />
          </Dropdown>
        )}
      </div>
    </div>
  );
};
