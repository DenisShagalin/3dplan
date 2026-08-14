import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import { useTranslations } from "next-intl";
import { Flex } from "antd";

export default function TermsPage() {
  const t = useTranslations();

  return (
    <Flex vertical align="center">
      <Flex
        vertical
        className="smal_wrapper small_padding"
        style={{
          width: "60%",
          backgroundColor: "var(--main-white-color)",
          padding: "40px",
          margin: "50px 0",
        }}
      >
        <Title
          style={{
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            color: "var(--main-grey-color)",
          }}
          level={2}
        >
          {t("termsPage.title")}
        </Title>

        <Paragraph
          style={{
            fontSize: "18px",
            color: "var(--main-grey-color)",
            lineHeight: "2rem",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: t.raw("termsPage.description"),
            }}
          />
        </Paragraph>
      </Flex>
    </Flex>
  );
}
