"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getOrderHref } from "@/app/components/order";
import { Logos } from "@/app/components/logos";
import { UiServicesInfo } from "@/app/components/common/ui-services-info";
import "./home.css";

// A hand-drawn sketch on the left fading into the finished 3D plan.
const HERO_IMAGE = "/home/hero.webp";

const VALUE_KEYS = ["anySource", "fixedPrice", "ready"];

// Surcharges shown on the price card, under "pricePage.surcharges".
const ADDON_KEYS = ["extraFloor", "rooms", "express"];

// Reviews under "feedback.<key>"; "name" reads "Name, Role".
const REVIEW_KEYS = ["thomas", "madeleine", "vicdan", "olga", "sergio", "irina"];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function Home() {
  const t = useTranslations();

  return (
    <div className="hm_page ui_page">
      <section className="hm_hero">
        <div>
          <div className="hm_kicker">{t("homePage.kicker")}</div>
          <h1 className="hm_h1">{t("homePage.title")}</h1>
          <p className="hm_lead">{t("homePage.lead")}</p>
          <div className="hm_actions">
            <Link href={getOrderHref("")} className="ui_btn">
              {t("homePage.order")} →
            </Link>
            <div className="hm_pill">
              <span className="hm_pill_amount">{t("homePage.price")}</span>
              <span className="hm_pill_term">{t("pricePage.delivery")}</span>
            </div>
          </div>
        </div>

        <figure className="hm_visual">
          <img src={HERO_IMAGE} alt={t("homePage.title")} />
          {/* <span className="hm_label hm_label_before">
            {t("homePage.before")}
          </span>
          <span className="hm_label hm_label_after">{t("homePage.after")}</span> */}
        </figure>
      </section>

      <div className="hm_trust">
        <Logos />
      </div>

      <section className="hm_section">
        <h2 className="hm_h2">{t("homePage.value.title")}</h2>
        <p className="hm_muted hm_measure">{t("homePage.value.lead")}</p>
        <div className="hm_value_grid">
          {VALUE_KEYS.map((key) => (
            <div key={key} className="hm_value_card ui_card">
              <h3 className="hm_h3">{t(`homePage.value.${key}.title`)}</h3>
              <p>{t(`homePage.value.${key}.text`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hm_section">
        <div className="hm_price_card">
          <div>
            <h2 className="hm_h2">{t("homePage.pricing.title")}</h2>
            <p className="hm_price_text">{t("homePage.pricing.text")}</p>
            <div className="hm_price_big">
              {t("pricePage.planPrice")}{" "}
              <span>{t("homePage.pricing.perPlan")}</span>
            </div>
          </div>
          <ul className="hm_addons">
            {ADDON_KEYS.map((key) => (
              <li key={key}>
                <span>{t(`pricePage.surcharges.${key}`)}</span>
                <span>{t("pricePage.surcharges.amount")}</span>
              </li>
            ))}
            <li>
              <span>{t("homePage.pricing.revisions")}</span>
              <span>{t("homePage.pricing.included")}</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="hm_section">
        <h2 className="hm_h2">{t("homePage.reviewsTitle")}</h2>
        <div className="hm_reviews">
          {REVIEW_KEYS.map((key) => {
            const [name, ...role] = t(`feedback.${key}.name`).split(", ");
            return (
              <figure key={key} className="hm_review ui_card">
                <blockquote>“{t(`feedback.${key}.text`)}”</blockquote>
                <figcaption className="hm_person">
                  <span className="hm_avatar" aria-hidden="true">
                    {initials(name)}
                  </span>
                  <span>
                    <span className="hm_person_name">{name}</span>
                    <span className="hm_person_role">{role.join(", ")}</span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <UiServicesInfo skip />
    </div>
  );
}
