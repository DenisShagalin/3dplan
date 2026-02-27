import { Flex } from "antd";
import { useTranslations } from "next-intl";
import Text from "antd/lib/typography/Text";
import Typography from "antd/lib/typography/Typography";
import Paragraph from "antd/lib/typography/Paragraph";
import useMedia from "./media-hook";

import { Accordion } from "./accordion";
import { StepsAccordion } from "../steps-accordion";

const TextWrap = ({
  children,
  style = {},
}: {
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => (
  <Text
    style={{
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      color: "var(--main-grey-color)",
      fontSize: "1rem",
      fontWeight: "bold",
      ...style,
    }}
  >
    {children}
  </Text>
);

export const ServicesInfo = ({
  title,
  description,
  price = "39 €",
  priceText,
  descriptionitems,
  items,
  onOrder,
}: any) => {
  const t = useTranslations();
  const { isMiddle, isSmall } = useMedia();
  return (
    <>
      <Flex
        style={{
          width: isMiddle ? "100%" : "60%",
          margin: "auto",
          backgroundColor: "var(--main-white-color)",
          padding: isMiddle ? "3rem 0" : "3rem",
          marginBottom: "2rem",
          position: "relative",
        }}
        vertical
        align="center"
      >
        <Typography
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "1.375rem",
            color: "var(--main-grey-color)",
            width: isMiddle ? "80%" : "",
            fontWeight: "bold",
          }}
        >
          {t.rich(title, {
            br: () => <br />,
          })}
        </Typography>
        <Paragraph
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "1rem",
            marginTop: "0.5rem",
            color: "var(--main-grey-color)",
            width: isMiddle ? "80%" : "",
            textAlign: "center",
          }}
        >
          {t.rich(description, {
            br: () => <br />,
          })}
        </Paragraph>
        <Flex
          align="center"
          vertical={isSmall ? true : false}
          justify="space-around"
          style={{ width: "80%" }}
        >
          <Flex
            style={{
              position: isMiddle ? "relative" : "absolute",
              bottom: isMiddle ? "" : "-125px",
              left: isMiddle ? "" : "-25px",
              width: isMiddle ? "150px" : "250px",
              height: isMiddle ? "150px" : "250px",
              backgroundColor: "var(--main-green-color)",
              borderRadius: "50%",
              color: "var(--main-grey-color)",
            }}
            align="center"
            justify="center"
            vertical
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: isMiddle ? "2rem" : "4rem",
              }}
            >
              {price}
            </span>
            <span
              style={{
                fontSize: isMiddle ? "1rem" : "1.5rem",
                textAlign: "center",
              }}
            >
              {t(priceText)}
            </span>
          </Flex>
          <Flex
            vertical
            align="flex-start"
            justify="flex-start"
            style={{ paddingTop: isSmall ? "1rem" : "" }}
          >
            {descriptionitems.map((item: string, idx: number) => (
              <TextWrap key={idx} style={{ textAlign: "left" }}>
                {t(item)}
              </TextWrap>
            ))}
          </Flex>
        </Flex>
        <button
          className="order_button"
          onClick={onOrder}
          style={{ marginTop: "1rem" }}
        >
          {t("control.order")}
        </button>
      </Flex>

      <Flex
        style={{
          width: isSmall ? "80%" : "60%",
          margin: "auto",
          marginBottom: "2rem",
        }}
        vertical
        align="center"
      >
        <Flex
          vertical
          align="flex-start"
          style={{ marginLeft: isSmall ? "" : "5rem" }}
        >
          {items.map((item: string, idx: number) => (
            <TextWrap
              key={idx}
              style={{
                color: "var(--light-grey-color)",
                fontWeight: "normal",
                textAlign: "left",
              }}
            >
              {t(item)}
            </TextWrap>
          ))}
        </Flex>
      </Flex>
      <StepsAccordion
        title="mainInstruction.title"
        steps={[
          "mainInstruction.step1",
          "mainInstruction.step2",
          "mainInstruction.step3",
        ]}
        descripition={[
          "mainInstruction.description1",
          "mainInstruction.description2",
          "mainInstruction.description3",
        ]}
      />

      <Flex
        justify="center"
        align={isMiddle ? "center" : "flex-start"}
        vertical={isMiddle ? true : false}
      >
        <Flex
          align="flex-start"
          justify="space-around"
          className="smal_wrapper"
          gap="middle"
          wrap
          style={{
            width: isSmall || isMiddle ? "80%" : "50%",
            marginBottom: isSmall ? "1rem" : "2rem",
          }}
        >
          <Accordion
            title="mainFAQ.1.question"
            description="mainFAQ.1.answer"
          />
          <Accordion
            title="mainFAQ.2.question"
            description="mainFAQ.2.answer"
          />
          <Accordion
            title="mainFAQ.3.question"
            description="mainFAQ.3.answer"
          />
          <Accordion
            title="mainFAQ.4.question"
            description="mainFAQ.4.answer"
          />
          <Accordion
            title="mainFAQ.5.question"
            description="mainFAQ.5.answer"
          />
          <Accordion
            title="mainFAQ.6.question"
            description="mainFAQ.6.answer"
          />
          <Accordion
            title="mainFAQ.7.question"
            description="mainFAQ.7.answer"
          />
        </Flex>
        <Flex
          align="flex-start"
          justify="space-around"
          className="smal_wrapper"
          gap="middle"
          wrap
          style={{
            width: isSmall || isMiddle ? "80%" : "50%",
            marginBottom: isSmall ? "1rem" : "2rem",
          }}
        >
          <Accordion
            title="mainFAQ.8.question"
            description="mainFAQ.8.answer"
          />
          <Accordion
            title="mainFAQ.9.question"
            description="mainFAQ.9.answer"
          />
          <Accordion
            title="mainFAQ.10.question"
            description="mainFAQ.10.answer"
          />
          <Accordion
            title="mainFAQ.11.question"
            description="mainFAQ.11.answer"
          />
          <Accordion
            title="mainFAQ.12.question"
            description="mainFAQ.12.answer"
          />
          <Accordion
            title="mainFAQ.13.question"
            description="mainFAQ.13.answer"
          />
          <Accordion
            title="mainFAQ.14.question"
            description="mainFAQ.14.answer"
          />
        </Flex>
      </Flex>
    </>
  );
};
