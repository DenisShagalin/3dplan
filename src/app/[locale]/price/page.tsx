"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { OrderType, getOrderHref } from "@/app/components/order";
import { UiServicesInfo } from "@/app/components/common/ui-services-info";
import "./price.css";

const PLANS: {
  orderType: Exclude<OrderType, "">;
  titleKey: string;
  itemKeys: string[];
}[] = [
  {
    orderType: "2D floor plan with dimensions",
    titleKey: "pricing.dimension.title",
    itemKeys: [
      "pricePage.dimension.item1",
      "pricePage.dimension.item2",
      "pricePage.topView",
      "pricePage.delivery",
    ],
  },
  {
    orderType: "2D floor plan with furniture",
    titleKey: "pricing.furniture.title",
    itemKeys: [
      "pricePage.furniture.item1",
      "pricePage.furniture.item2",
      "pricePage.topView",
      "pricePage.delivery",
    ],
  },
  {
    orderType: "3D floor plan with furniture",
    titleKey: "pricing.3d.title",
    itemKeys: [
      "pricePage.3d.item1",
      "pricePage.3d.item2",
      "pricePage.3d.item3",
      "pricePage.delivery",
    ],
  },
];

const SURCHARGE_KEYS = [
  "express",
  "complex",
  "rooms",
  "extraFloor",
  "outdoor",
  "unreadable",
];

const OTHER_SERVICES = ["interior", "exterior"];

export default function Price() {
  const t = useTranslations();

  return (
    <div className="price_page ui_page">
      <section className="price_top">
        <h1 className="price_h1">
          {t.rich("pricePage.headline", {
            accent: (chunks) => <span>{chunks}</span>,
          })}
        </h1>
        <p className="price_lead">{t("pricePage.lead")}</p>
      </section>

      <section className="price_plans">
        {PLANS.map(({ orderType, titleKey, itemKeys }) => (
          <div key={orderType} className="price_plan ui_card">
            <h2 className="price_plan_title">{t(titleKey)}</h2>
            <div className="price_plan_price">{t("pricePage.planPrice")}</div>
            <ul className="price_check">
              {itemKeys.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <Link href={getOrderHref(orderType)} className="ui_btn">
              {t("control.order")}
            </Link>
          </div>
        ))}
      </section>

      <section className="price_surcharges ui_card">
        <h2 className="price_h2">{t("pricePage.surcharges.title")}</h2>
        <ul className="price_sc_list">
          {SURCHARGE_KEYS.map((key) => (
            <li key={key}>
              <span>{t(`pricePage.surcharges.${key}`)}</span>
              <span className="price_sc_amount">
                {t("pricePage.surcharges.amount")}
              </span>
            </li>
          ))}
        </ul>
        <p className="price_sc_note">{t("pricePage.surcharges.note")}</p>
      </section>

      <section className="price_other">
        <h2 className="price_h2">{t("pricePage.other.title")}</h2>
        <p className="price_other_lead">{t("pricePage.other.lead")}</p>
        <div className="price_other_grid">
          {OTHER_SERVICES.map((key) => (
            <div key={key} className="price_other_card">
              <div className="price_other_body">
                <h3 className="price_other_title">
                  {t(`pricePage.other.${key}.title`)}
                </h3>
                <div className="price_other_price">
                  {t(`pricePage.other.${key}.price`)}{" "}
                  <span>{t("pricePage.other.perView")}</span>
                </div>
                <div className="price_other_note">
                  {t(`pricePage.other.${key}.note`)}
                </div>
              </div>
              <Link href={`/service/${key}`} className="price_btn_outline">
                {t("pricePage.other.more")}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="price_legal">
        <strong>{t("pricePage.legal.label")}</strong> {t("pricePage.legal.text")}
      </section>

      <UiServicesInfo skip />
    </div>
  );
}
