"use client";

import { useTranslations } from "next-intl";
import { Flex } from "antd";
import useMedia from "../components/common/media-hook";

export default function About() {
  const t = useTranslations();
  const { isMiddle } = useMedia();
  return (
    <Flex
      vertical={isMiddle}
      align="center"
      justify="center"
      style={{
        width: "80%",
        backgroundColor: "var(--main-white-color)",
        margin: "0 auto 40px auto",
        padding: "20px",
      }}
    >
      <img
        className="about_photo"
        src="/aboutus.jpg"
        alt="about us"
        style={{
          width: "40%",
        }}
      />
      <Flex
        vertical
        align="center"
        className="small_padding smal_wrapper"
        style={{
          width: "60%",
          backgroundColor: "var(--main-white-color)",
          padding: "20px",
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: t.raw("aboutus.description"),
          }}
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "18px",
            marginTop: "1rem",
            color: "var(--main-grey-color)",
          }}
        />
      </Flex>
    </Flex>
  );
}
