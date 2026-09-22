"use client";

import "./main-links.css";

import { useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown } from "./common/dropdown";
import useMedia from "./common/media-hook";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { isSupportedLocale } from "@/i18n/locales";
import { useOrder } from "../hooks/useOrder";

export const MainLinks = () => {
  // Resolved on the server from the URL prefix, the cookie or the browser.
  const locale = useLocale();
  // Without the locale prefix, so it can be re-rendered under another one.
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const { isSmall } = useMedia();
  const { showOrder } = useOrder();

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
    <header className="site_header">
      <div className="site_header_inner">
        <Link href="/" className="site_header_logo" aria-label="3Dplan.online">
          3D<span>plan</span>.online
        </Link>

        {!isSmall && (
          <nav className="site_header_nav">
            <Dropdown
              items={serviceItems}
              onClick={(href) => router.push(href)}
              rootClassName="ui_dropdown"
              selectedKeys={[pathname]}
            >
              <Link href="" className="site_header_dd">
                {t("toolbar.services")}
                <DownOutlined className="site_header_chevron" />
              </Link>
            </Dropdown>
            <Link href="/price">{t("toolbar.pricing")}</Link>
            <Link href="/about">{t("toolbar.about")}</Link>
            <Link href="/contact">{t("toolbar.contact")}</Link>
          </nav>
        )}

        <div className="site_header_actions">
          <Dropdown
            items={lang}
            onClick={onClick}
            placement="bottomRight"
            rootClassName="ui_dropdown ui_dropdown_compact"
            selectedKeys={[locale]}
          >
            <span className="site_header_lang">
              {locale.toUpperCase()}
              <DownOutlined className="site_header_chevron" />
            </span>
          </Dropdown>

          {!isSmall && (
            <button
              type="button"
              className="site_header_btn ui_btn"
              onClick={() => showOrder("")}
            >
              {t("control.order")}
            </button>
          )}

          {isSmall && (
            <Dropdown
              // @ts-ignore
              items={items}
              onClick={onClick}
              // placement="bottomLeft" // previous placement
              placement="bottomRight"
              rootClassName="ui_dropdown"
              selectedKeys={[pathname, locale]}
            >
              <MenuOutlined className="site_header_burger" />
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
};
