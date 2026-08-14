"use client";

import Paragraph from "antd/lib/typography/Paragraph";
import { useTranslations } from "next-intl";
import { Flex } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import useMedia from "@/app/components/common/media-hook";
import { consumeConfirmation } from "@/app/utils/confirmation";

export default function Confirmation() {
  const t = useTranslations();
  const router = useRouter();

  const { isSmall } = useMedia();

  // Reachable only right after a contact or order submit.
  const [isAllowed, setAllowed] = useState(false);
  const [submittedKey, setSubmittedKey] = useState<
    "contact" | "order" | null | undefined
  >(null);
  // The flag is one-shot, so it must not be read twice (StrictMode in dev).
  const isChecked = useRef(false);

  useEffect(() => {
    if (isChecked.current) return;
    isChecked.current = true;

    const key = consumeConfirmation();

    if (key === "contact" || key === "order") {
      setAllowed(true);
      setSubmittedKey(key);
    } else {
      router.replace("/");
    }
  }, [router]);

  if (!isAllowed) {
    return null;
  }

  return (
    <Flex
      gap="middle"
      align="flex-start"
      vertical
      className="smal_wrapper small_padding"
      style={{
        width: "70%",
        maxWidth: "820px",
        margin: "16px auto",
        padding: 16,
        background: "#ffffff",
      }}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        style={{
          width: "100%",
        }}
      >
        <Title
          style={{
            fontFamily: "Arial, sans-serif",
            color: "var(--main-grey-color)",
            textAlign: "center",
          }}
          level={4}
        >
          {t.rich(
            submittedKey === "order"
              ? "confirmation.title"
              : "confirmationContact.title",
            {
              br: () => <br />,
            },
          )}
        </Title>

        <Paragraph
          style={{
            fontFamily: "Calibri, sans-serif",
            fontSize: isSmall ? "14px" : "18px",
            marginTop: "1rem",
            color: "var(--main-grey-color)",
            textAlign: "center",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html:
                submittedKey === "order"
                  ? t.raw("confirmation.description")
                  : t.raw("confirmationContact.description"),
            }}
          />
        </Paragraph>
      </Flex>
    </Flex>
  );
}
