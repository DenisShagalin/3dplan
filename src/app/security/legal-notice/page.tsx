import Paragraph from "antd/lib/typography/Paragraph";
import { useTranslations } from "next-intl";
import { Flex } from "antd";

export default function LegalNoticePage() {
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
        <Paragraph
          style={{
            fontSize: "18px",
            color: "var(--main-grey-color)",
            lineHeight: "2rem",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: t.raw("legalNotice.description"),
            }}
          />
        </Paragraph>
      </Flex>
    </Flex>
  );
}
