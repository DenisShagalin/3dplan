"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Carousel } from "@/app/components/common/carousel";
import { Picture } from "@/app/components/picture";
import { getOrderHref } from "@/app/components/order";
import "../service.css";
import "./interior.css";

const HERO_IMAGE = "/interior/hero.webp";

// One room rendered on its own, next to the 3D floor plan it comes from.
// Caption keys under "service.interior.howItWorks".
const PAIR = [
  ["/interior/room.webp", "room"],
  ["/interior/plan.webp", "plan"],
].map(([src, key]) => ({ src, key: `service.interior.howItWorks.${key}` }));

const PORTFOLIO = [
  "living-dining",
  "kitchen",
  "kids-room",
  "living-study",
  "walk-in-wardrobe",
  "living-kitchen",
].map((file) => `/interior/portfolio/${file}.webp`);

const ORDER_HREF = getOrderHref("3D interior visualization");

export default function Page() {
  const t = useTranslations();
  const [src, setSrc] = useState("");

  const onClick = useCallback(
    (src: string) => () => {
      setSrc(src);
    },
    [],
  );

  const title = t("toolbar.servicesItems.3dIn");

  const pricePill = (term: string) => (
    <div className="sv_pill">
      <span className="sv_pill_amount">{t("pricePage.planPrice")}</span>
      <span className="sv_pill_term">{term}</span>
    </div>
  );

  return (
    <div className="sv_page in_page ui_page">
      <Picture src={src} open={!!src} setOpen={() => setSrc("")} />

      <nav className="sv_crumbs">
        {t("toolbar.services")} / {title}
      </nav>

      <section className="sv_hero">
        <div>
          <h1 className="sv_h1">{title}</h1>
          <p className="sv_lead">{t("service.interior.lead")}</p>
          {pricePill(t("service.interior.priceTerm"))}
          <p className="in_condition">{t("service.interior.condition")}</p>
          <div className="sv_actions">
            <Link href={ORDER_HREF} className="ui_btn">
              {t("control.order")} →
            </Link>
          </div>
        </div>

        <div className="sv_visual">
          <img src={HERO_IMAGE} alt={title} onClick={onClick(HERO_IMAGE)} />
        </div>
      </section>

      <section className="sv_section">
        <h2 className="sv_h2">{t("service.interior.howItWorks.title")}</h2>
        <p className="sv_muted sv_measure">
          {t("service.interior.howItWorks.lead")}
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
        {pricePill(t("service.interior.ctaTerm"))}
        <div>
          <Link href={ORDER_HREF} className="ui_btn">
            {t("service.interior.order")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
