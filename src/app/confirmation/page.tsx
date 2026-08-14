"use client";

import Paragraph from "antd/lib/typography/Paragraph";
import { useTranslations } from "next-intl";
import { Flex } from "antd";
import Title from "antd/lib/typography/Title";
import useMedia from "../components/common/media-hook";

export default function Confirmation() {
  const t = useTranslations();

  const { isSmall } = useMedia();

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
          {t.rich("confirmation.title", {
            br: () => <br />,
          })}
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
              __html: t.raw("confirmation.description"),
            }}
          />
        </Paragraph>
      </Flex>
    </Flex>
  );
}
