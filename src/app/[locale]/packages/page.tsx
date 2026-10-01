"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getOrderHref } from "@/app/components/order";
import { PACKAGES } from "@/app/components/packages";
import "./packages.css";

const GOOD_TO_KNOW = ["fixed", "extras", "formats"];

export default function Packages() {
  const t = useTranslations("packagesPage");

  return (
    <div className="pkg_page ui_page">
      <section className="pkg_top">
        <h1 className="pkg_h1">{t("headline")}</h1>
        <p className="pkg_lead">{t("lead")}</p>
      </section>

      <section className="pkg_grid">
        {PACKAGES.map(
          ({ key, orderType, oldPrice, price, featured, itemKeys }) => (
            <div
              key={key}
              className={`pkg_card ui_card${featured ? " pkg_card_featured" : ""}`}
            >
              {featured && <div className="pkg_badge">{t("popular")}</div>}
              <h2 className="pkg_name">{t(`${key}.name`)}</h2>
              <div className="pkg_sub">{t(`${key}.sub`)}</div>
              <div className="pkg_price_row">
                <s className="pkg_old">{t("price", { amount: oldPrice })}</s>
                <span className="pkg_new">{t("price", { amount: price })}</span>
              </div>
              <ul className="pkg_check">
                {itemKeys.map((item) => (
                  <li key={item}>{t(`items.${item}`)}</li>
                ))}
              </ul>
              <Link
                href={getOrderHref(orderType)}
                className={featured ? "ui_btn pkg_btn" : "pkg_btn_outline"}
              >
                {t("order")}
              </Link>
            </div>
          ),
        )}
      </section>

      <section className="pkg_why">
        <h2 className="pkg_h2">{t("good.title")}</h2>
        <div className="pkg_why_grid">
          {GOOD_TO_KNOW.map((key) => (
            <div key={key}>
              <h3 className="pkg_why_title">{t(`good.${key}.title`)}</h3>
              <p className="pkg_why_text">{t(`good.${key}.text`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pkg_single">
        {t("single.text")} <Link href="/price">{t("single.link")}</Link>
      </section>
    </div>
  );
}
