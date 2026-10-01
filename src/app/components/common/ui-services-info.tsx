"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { OrderType, getOrderHref } from "@/app/components/order";
import "./ui-services-info.css";

// Redesigned copy of ServicesInfo (services-info.tsx), built on the ui_*
// classes. The original stays as-is for the legacy pages.

const STEPS = [1, 2, 3];
const FAQ = Array.from({ length: 14 }, (_, idx) => idx + 1);
// The FAQ is laid out in rows of two, see .usi_faq_row.
const FAQ_ROWS = Array.from({ length: Math.ceil(FAQ.length / 2) }, (_, idx) =>
  FAQ.slice(idx * 2, idx * 2 + 2),
);

const richTags = {
  br: () => <br />,
  strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
};

// Not a <details>: the card has to be a grid container (subgrid) so that
// closed cards in a row share a height while an open one grows on its own,
// and <details> can't reliably be a grid container across browsers.
// See .usi_disc in the stylesheet.
const DisclosureCard = ({
  className,
  toggleClassName,
  bodyClassName,
  summary,
  children,
}: {
  className: string;
  toggleClassName: string;
  bodyClassName: string;
  summary: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const bodyId = useId();

  return (
    <div className={`usi_disc ${className}${open ? " usi_disc_open" : ""}`}>
      <button
        type="button"
        className={`usi_disc_toggle ${toggleClassName}`}
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((value) => !value)}
      >
        {summary}
      </button>
      {/* Kept in the DOM while closed, as <details> did. */}
      <p id={bodyId} className={bodyClassName} hidden={!open}>
        {children}
      </p>
    </div>
  );
};

export const UiServicesInfo = ({
  title,
  description,
  price = "39 €",
  priceText,
  descriptionItems = [],
  items = [],
  orderType,
  skip = false,
}: {
  title?: string;
  description?: string;
  price?: string;
  priceText?: string;
  descriptionItems?: string[];
  items?: string[];
  orderType?: Exclude<OrderType, "">;
  // Show only the steps and FAQ, without the service block.
  skip?: boolean;
}) => {
  const t = useTranslations();

  return (
    <div className="usi">
      {!skip && title && (
        <section className="usi_service ui_card">
          <h2 className="usi_h2">{t.rich(title, richTags)}</h2>
          {description && (
            <p className="usi_description">{t.rich(description, richTags)}</p>
          )}
          <div className="usi_offer">
            <div className="usi_price">
              <span className="usi_price_value">{price}</span>
              {priceText && (
                <span className="usi_price_text">{t(priceText)}</span>
              )}
            </div>
            <ul className="usi_list">
              {descriptionItems.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </div>
          {items.length > 0 && (
            <ul className="usi_extras">
              {items.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          )}
          {orderType && (
            <Link href={getOrderHref(orderType)} className="ui_btn">
              {t("control.order")}
            </Link>
          )}
        </section>
      )}

      <section className="usi_section">
        <h2 className="usi_h2">{t("mainInstruction.title")}</h2>
        <div className="usi_steps">
          {STEPS.map((n) => (
            <DisclosureCard
              key={n}
              className="usi_step ui_card"
              toggleClassName="usi_step_head"
              bodyClassName="usi_step_text"
              summary={
                <>
                  <span className="usi_step_num">{n}</span>
                  <span className="usi_step_title">
                    {t(`mainInstruction.step${n}`)}
                  </span>
                </>
              }
            >
              {t.rich(`mainInstruction.description${n}`, richTags)}
            </DisclosureCard>
          ))}
        </div>
      </section>

      <section className="usi_section">
        <h2 className="usi_h2">{t("mainFAQ.title")}</h2>
        <div className="usi_faq">
          {FAQ_ROWS.map((row) => (
            <div key={row[0]} className="usi_faq_row">
              {row.map((n) => (
                <DisclosureCard
                  key={n}
                  className="usi_faq_item"
                  toggleClassName="usi_faq_question"
                  bodyClassName="usi_faq_answer"
                  summary={t(`mainFAQ.${n}.question`)}
                >
                  {t.rich(`mainFAQ.${n}.answer`, richTags)}
                </DisclosureCard>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
