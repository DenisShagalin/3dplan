"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Carousel } from "@/app/components/common/carousel";
import { Slider } from "@/app/components/common/slider";
import { Picture } from "@/app/components/picture";
import { getOrderHref } from "@/app/components/order";
import { UiServicesInfo } from "@/app/components/common/ui-services-info";
import "../service.css";

// The previous version of this page lives at "/service/old_2d-dimension"
// for comparison.

const HERO_IMAGE = "/2d-dimension/hero.webp";

// Image file → caption key under "service.2dDim.portfolio".
const PORTFOLIO = [
  ["apartment-60-switzerland", "apartment60Switzerland"],
  ["apartment-190-berlin", "apartment190Berlin"],
  ["house-63-germany", "house63Germany"],
  ["house-95-vienna", "house95Vienna"],
].map(([file, key]) => ({
  src: `/2d-dimension/portfolio/${file}.webp`,
  key: `service.2dDim.portfolio.${key}`,
}));

const CHECKLIST_KEYS = [
  "pricePage.dimension.item1",
  "pricePage.dimension.item2",
  "pricePage.topView",
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

const ORDER_HREF = getOrderHref("2D floor plan with dimensions");

// "pricing.dimension.description" is authored HTML made of <p> blocks. The first
// paragraph is the lead, the second says what the plan is for, the rest what
// is included. The paragraphs are plain text, so they render as text.
const paragraphs = (html: string) =>
  Array.from(html.matchAll(/<p>([\s\S]*?)<\/p>/g), (match) => match[1]);

export default function Page() {
  const t = useTranslations();
  const [src, setSrc] = useState("");

  const onClick = useCallback(
    (src: string) => () => {
      setSrc(src);
    },
    [],
  );

  const [lead, about, ...included] = paragraphs(
    t.raw("pricing.dimension.description"),
  );

  const pricePill = (term: string) => (
    <div className="sv_pill">
      <span className="sv_pill_amount">{t("pricePage.planPrice")}</span>
      <span className="sv_pill_term">{term}</span>
    </div>
  );

  return (
    <div className="sv_page ui_page">
      <Picture src={src} open={!!src} setOpen={() => setSrc("")} />

      <nav className="sv_crumbs">
        {t("toolbar.services")} / {t("toolbar.servicesItems.2dDim")}
      </nav>

      <section className="sv_hero">
        <div>
          <h1 className="sv_h1">
            {t("service.2dDim.serviceInfo.title")}
          </h1>
          <p className="sv_lead">{lead}</p>
          {pricePill(t("service.2dDim.serviceInfo.priceText"))}
          <div className="sv_actions">
            <Link href={ORDER_HREF} className="ui_btn">
              {t("control.order")} →
            </Link>
            <span className="sv_muted">{t("pricePage.delivery")}</span>
          </div>
          <ul className="sv_check">
            {CHECKLIST_KEYS.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </div>

        <div className="sv_visual">
          <img
            src={HERO_IMAGE}
            alt={t("service.2dDim.serviceInfo.title")}
            onClick={onClick(HERO_IMAGE)}
          />
        </div>
      </section>

      <section className="sv_section">
        <h2 className="sv_h2">{t("servicePage.examples")}</h2>
        <p className="sv_muted sv_measure">{t("servicePage.examplesLead")}</p>
        <div className="sv_portfolio">
          <Carousel loading={false}>
            {PORTFOLIO.map(({ src, key }) => (
              <div key={src} className="image_wrap">
                <figure className="sv_pf_item">
                  <img src={src} alt={t(key)} onClick={onClick(src)} />
                  <figcaption className="sv_pf_caption">{t(key)}</figcaption>
                </figure>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="sv_section sv_desc">
        <div>
          <h2 className="sv_h2">{t("servicePage.about")}</h2>
          <p>{about}</p>
        </div>
        <div>
          <h2 className="sv_h2">{t("servicePage.included")}</h2>
          {included.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </section>

      <section className="sv_section">
        <h2 className="sv_h2">{t("pricePage.surcharges.title")}</h2>
        <ul className="sv_sc_list">
          {SURCHARGE_KEYS.map((key) => (
            <li key={key}>
              <span>{t(`pricePage.surcharges.${key}`)}</span>
              <span className="sv_sc_amount">
                {t("pricePage.surcharges.amount")}
              </span>
            </li>
          ))}
        </ul>
        <p className="sv_muted sv_sc_note">{t("pricePage.surcharges.note")}</p>
      </section>

      <section className="sv_section">
        <h2 className="sv_h2">{t("pricePage.other.title")}</h2>
        <div className="sv_related">
          {OTHER_SERVICES.map((key) => (
            <div key={key} className="sv_related_card ui_card">
              <div>
                <div className="sv_related_name">
                  {t(`pricePage.other.${key}.title`)}
                </div>
                <div className="sv_related_note">
                  {t(`pricePage.other.${key}.price`)}{" "}
                  {t("pricePage.other.perView")} ·{" "}
                  {t(`pricePage.other.${key}.note`)}
                </div>
              </div>
              {/* No service pages for these yet, so "more" asks us directly. */}
              <Link href="/contact" className="sv_btn_outline">
                {t("pricePage.other.more")}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="sv_cta">
        {pricePill(t("pricePage.delivery"))}
        <div>
          <Link href={ORDER_HREF} className="ui_btn">
            {t("control.order")} →
          </Link>
        </div>
      </section>

      <UiServicesInfo skip />

      <section className="sv_section" style={{ padding: "0" }}>
        <div className="sv_slider">
          <Slider
            left="/2d-dimension/slider1.jpg"
            right="/2d-dimension/slider2.jpg"
          />
        </div>
      </section>
    </div>
  );
}
