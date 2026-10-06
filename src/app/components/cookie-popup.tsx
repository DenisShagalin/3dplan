"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { readConsent, saveConsent } from "@/app/utils/gtag";
import "./cookie-popup.css";

export const CookiePopup = () => {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  // A missing or expired (6+ months) choice asks again. A stored "accepted"
  // is reapplied to gtag by the bootstrap in the layout, not here.
  useEffect(() => {
    if (!readConsent()) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    saveConsent(true);
    setVisible(false);
  };

  const handleDecline = () => {
    saveConsent(false);
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
