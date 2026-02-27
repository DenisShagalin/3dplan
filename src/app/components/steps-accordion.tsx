"use client";

import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import { useTranslations } from "next-intl";
import { Flex } from "antd";
import { Step, StepWrap } from "./steps";
import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import useMedia from "./common/media-hook";

export const StepsAccordion = ({
  title,
  steps,
  descripition,
}: {
  title: string;
  steps: string[];
  descripition: string[];
}) => {
  const [openedStep, setOpenedStep] = useState<number | null>(null);
  const t = useTranslations();
  const { isSmall } = useMedia();

  return (
    <Flex
      vertical
      className="small_padding unset_wdith"
      align="center"
      style={{
        width: "100%",
        backgroundColor: "var(--main-white-color)",
        marginBottom: "50px",
      }}
      onBlur={() => setOpenedStep(null)}
      tabIndex={0}
    >
      <Title
        style={{
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          color: "var(--main-grey-color)",
        }}
        level={2}
      >
        {t(title).toUpperCase()}
      </Title>

      <Flex
        className="steps_wrapper"
        align={ isSmall ? "center" : "flex-start"}
        justify="space-around"
        gap="small"
        wrap
        style={{
          padding: "0px 20px 20px 20px",
        }}
      >
        {steps.map((step, idx) => (
          <Flex
            key={idx}
            vertical
            style={{ width: "30%" }}
            align={isSmall ? "center" : "center"}
          >
            <Step step={idx + 1} />
            <StepWrap
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Paragraph
                style={{
                  fontFamily: "Arial, sans-serif",
                  color: "var(--main-grey-color)",
                  fontSize: "1.25rem",
                  textAlign: "center",
                }}
              >
                {t(step)}
              </Paragraph>
            </StepWrap>
            {openedStep === idx ? (
              <UpOutlined
                onClick={() => setOpenedStep(null)}
                style={{
                  // marginLeft: isSmall ? "23px" : undefined,
                  marginTop: isSmall ? "10px" : undefined,
                }}
              />
            ) : (
              <DownOutlined
                onClick={() => setOpenedStep(idx)}
                style={{
                  // marginLeft: isSmall ? "23px" : undefined,
                  marginTop: isSmall ? "10px" : undefined,
                }}
              />
            )}
            <div
              style={{ position: "relative", width: isSmall ? "100%" : "150%" }}
            >
              {openedStep === idx && (
                <Flex
                  style={{
                    position: "absolute",
                    marginTop: "20px",
                    backgroundColor: "var(--main-white-color)",
                    padding: "0 20px",
                  }}
                >
                  <Paragraph
                    style={{
                      fontFamily: "Arial, sans-serif",
                      color: "var(--main-grey-color)",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    {t.rich(descripition[idx], {
                      br: () => <br />,
                      strong: (c) => <strong>{c}</strong>,
                    })}
                  </Paragraph>
                </Flex>
              )}
            </div>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
