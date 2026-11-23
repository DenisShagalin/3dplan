"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Modal, Switch, Typography } from "antd";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  type ConsentChoice,
  onOpenCookieSettings,
  readConsent,
  saveConsent,
} from "@/app/utils/gtag";
import "./cookie-popup.css";

const ALL: ConsentChoice = { statistics: true, marketing: true };
const NECESSARY_ONLY: ConsentChoice = { statistics: false, marketing: false };

export const CookiePopup = () => {
  const t = useTranslations("cookie");
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>(NECESSARY_ONLY);

  // A missing or expired (6+ months) choice asks again. A stored choice is
  // reapplied to gtag by the bootstrap in the layout, not here.
  useEffect(() => {
    if (!readConsent()) {
      setBannerVisible(true);
    }
  }, []);

  // The footer's "Cookie settings" link reopens the dialog on any page.
  useEffect(
    () =>
      onOpenCookieSettings(() => {
        setDraft(readConsent() ?? NECESSARY_ONLY);
        setSettingsOpen(true);
      }),
    [],
  );

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setBannerVisible(false);
    setSettingsOpen(false);
  };

  const openSettings = () => {
    setDraft(readConsent() ?? NECESSARY_ONLY);
    setSettingsOpen(true);
  };

  return (
    <>
      {bannerVisible && (
        <div
          className="cookie-popup"
          role="region"
          aria-label={t("settingsTitle")}
        >
          <Flex align="center" gap={16} wrap="wrap">
            <Typography.Text className="cookie-popup__text">
              {t.rich("message", {
                link: (chunks) => (
                  <Link href="/security/privacy" className="cookie-popup__link">
                    {chunks}
                  </Link>
                ),
              })}
            </Typography.Text>
            {/* Equal buttons on purpose: none may be styled to nudge the
                visitor towards accepting. */}
            <Flex gap={8} wrap="wrap" className="cookie-popup__actions">
              <Button onClick={() => choose(ALL)} className="cookie-popup__btn">
                {t("acceptAll")}
              </Button>
              <Button
                onClick={() => choose(NECESSARY_ONLY)}
                className="cookie-popup__btn"
              >
                {t("necessaryOnly")}
              </Button>
              <Button onClick={openSettings} className="cookie-popup__btn">
                {t("settings")}
              </Button>
            </Flex>
          </Flex>
        </div>
      )}

      <Modal
        open={settingsOpen}
        title={<div style={{ padding: "1rem" }}>{t("settingsTitle")}</div>}
        onCancel={() => setSettingsOpen(false)}
        footer={
          <Flex
            gap={8}
            justify="flex-end"
            wrap="wrap"
            style={{ padding: "1rem" }}
          >
            <Button onClick={() => choose(draft)}>{t("save")}</Button>
            <Button onClick={() => choose(ALL)}>{t("acceptAll")}</Button>
          </Flex>
        }
      >
        <Flex
          vertical
          gap={16}
          className="cookie-settings"
          style={{ padding: "1rem" }}
        >
          {(["necessary", "statistics", "marketing"] as const).map((key) => (
            <Flex key={key} gap={16} align="flex-start" justify="space-between">
              <div>
                <Typography.Text strong>{t(`${key}Title`)}</Typography.Text>
                <Typography.Paragraph
                  type="secondary"
                  className="cookie-settings__desc"
                >
                  {t(`${key}Desc`)}
                </Typography.Paragraph>
              </div>
              {key === "necessary" ? (
                <Typography.Text
                  type="secondary"
                  className="cookie-settings__always"
                >
                  {t("alwaysOn")}
                </Typography.Text>
              ) : (
                <Switch
                  checked={draft[key]}
                  aria-label={t(`${key}Title`)}
                  onChange={(value) => setDraft({ ...draft, [key]: value })}
                />
              )}
            </Flex>
          ))}
        </Flex>
      </Modal>
    </>
  );
};
