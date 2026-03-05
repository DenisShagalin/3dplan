"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import "./cookie-popup.css";

const COOKIE_CONSENT_KEY = "3DPLAN_LOCALE_cookie_consent";

export const CookiePopup = () => {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-popup">
      <Flex align="center" gap={16} wrap="wrap">
        <Typography.Text className="cookie-popup__text">
          {t("message")}{" "}
          <Link href="/security/privacy" className="cookie-popup__link">
            {t("learnMore")}
          </Link>
        </Typography.Text>
        <Flex gap={8} className="cookie-popup__actions">
          <Button
            type="primary"
            onClick={handleAccept}
            className="cookie-popup__btn-accept"
          >
            {t("accept")}
          </Button>
          <Button onClick={handleDecline} className="cookie-popup__btn-decline">
            {t("decline")}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};
