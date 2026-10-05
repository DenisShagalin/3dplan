"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Carousel } from "@/app/components/common/carousel";
import { Picture } from "@/app/components/picture";
import { getOrderHref } from "@/app/components/order";
import "../service.css";
import "./exterior.css";

const HERO_IMAGE = "/exterior/hero.webp";

// The same building twice: the bare model the base price covers, then with
// the surroundings added. Caption keys under "service.exterior.included".
const PAIR = [
  ["/exterior/model.webp", "model"],
  ["/exterior/with-background.webp", "background"],
].map(([src, key]) => ({ src, key: `service.exterior.included.${key}` }));

// Caption keys under "service.exterior.backgrounds".
const BACKGROUNDS = ["mountains", "village", "sea", "night"].map((key) => ({
  src: `/exterior/backgrounds/${key}.webp`,
  key: `service.exterior.backgrounds.${key}`,
}));

const PORTFOLIO = [
  "two-storey-front",
  "two-storey-night",
  "bungalow-street",
  "bungalow-terrace",
  "bungalow-morning",
  "bungalow-evening",
  "flat-roof-night",
].map((file) => `/exterior/portfolio/${file}.webp`);

const SURCHARGE_KEYS = ["extraView", "landscaping"];

const PROVIDE_KEYS = [
  "sitePlan",
  "floorPlans",
  "elevations",
  "materials",
  "landscaping",
  "photos",
];

const ORDER_HREF = getOrderHref("3D exterior visualization");

export default function Page() {
  const t = useTranslations();
  const [src, setSrc] = useState("");

  const onClick = useCallback(
    (src: string) => () => {
      setSrc(src);
    },
    [],
  );

  const title = t("toolbar.servicesItems.3dEx");

  const pricePill = (term: string) => (
    <div className="sv_pill">
      <span className="sv_pill_amount">
        {t("pricePage.other.exterior.price")}
      </span>
      <span className="sv_pill_term">{term}</span>
    </div>
  );

  return (
    <div className="sv_page ex_page ui_page">
      <Picture src={src} open={!!src} setOpen={() => setSrc("")} />

      <nav className="sv_crumbs">
        {t("toolbar.services")} / {title}
      </nav>

      <section className="sv_hero">
        <div>
          <h1 className="sv_h1">{title}</h1>
          <p className="sv_lead">{t("service.exterior.lead")}</p>
          {pricePill(t("service.exterior.priceTerm"))}
          <div className="sv_actions">
            <Link href={ORDER_HREF} className="ui_btn">
              {t("control.order")} →
            </Link>
            <span className="sv_muted">{t("service.exterior.delivery")}</span>
          </div>
        </div>

        <div className="sv_visual">
          <img src={HERO_IMAGE} alt={title} onClick={onClick(HERO_IMAGE)} />
        </div>
      </section>

      <section className="sv_section">
        <h2 className="sv_h2">{t("service.exterior.included.title")}</h2>
        <p className="sv_muted sv_measure">
          {t("service.exterior.included.lead")}
        </p>
        <div className="sv_grid sv_grid_pair">
          {PAIR.map(({ src, key }) => (
            <figure key={src} className="sv_pf_item">
              <img src={src} alt={t(key)} onClick={onClick(src)} />
              <figcaption className="sv_pf_caption">{t(key)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="sv_section">
        <h2 className="sv_h2">{t("service.exterior.backgrounds.title")}</h2>
        <p className="sv_muted sv_measure">
          {t("service.exterior.backgrounds.lead")}
        </p>
        <div className="sv_grid ex_grid_bg">
          {BACKGROUNDS.map(({ src, key }) => (
            <figure key={src} className="sv_pf_item">
              <img src={src} alt={t(key)} onClick={onClick(src)} />
              <figcaption className="sv_pf_caption ex_bg_name">
                {t(key)}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="sv_section">
        <h2 className="sv_h2">{t("service.exterior.surcharges.title")}</h2>
        <ul className="sv_sc_list">
          {SURCHARGE_KEYS.map((key) => (
            <li key={key}>
              <span>
                {t(`service.exterior.surcharges.${key}`)}
                <span className="ex_sc_note">
                  {t(`service.exterior.surcharges.${key}Note`)}
                </span>
              </span>
              <span className="sv_sc_amount">
                {t("service.exterior.surcharges.amount")}
              </span>
            </li>
          ))}
        </ul>
        <p className="sv_muted sv_sc_note">{t("pricePage.surcharges.note")}</p>
      </section>

      <section className="sv_section">
        <h2 className="sv_h2">{t("service.exterior.provide.title")}</h2>
        <p className="sv_muted sv_measure">
          {t("service.exterior.provide.lead")}
        </p>
        <ul className="ex_list">
          {PROVIDE_KEYS.map((key) => (
            <li key={key}>{t(`service.exterior.provide.${key}`)}</li>
          ))}
        </ul>
      </section>

      <section className="sv_section">
        <h2 className="sv_h2">{t("servicePage.examples")}</h2>
        <p className="sv_muted sv_measure">{t("servicePage.examplesLead")}</p>
        <div className="sv_portfolio">
          <Carousel loading={false}>
            {PORTFOLIO.map((src) => (
              <div key={src} className="image_wrap">
                <figure className="sv_pf_item">
                  <img src={src} alt={title} onClick={onClick(src)} />
                </figure>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="sv_section sv_cta">
        {pricePill(t("service.exterior.delivery"))}
        <div>
          <Link href={ORDER_HREF} className="ui_btn">
            {t("service.exterior.order")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
