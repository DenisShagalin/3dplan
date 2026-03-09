"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { Flex } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import { useTranslations } from "next-intl";
import useMedia from "./common/media-hook";

const bannersData = [
  {
    planSrc: "/banner/plans.png",
    lines: ["banner.line1", "banner.line2", "banner.line3"],
    description: "banner.line4",
    price: "€39",
    priceText: "banner.priceText",
  },
  {
    planSrc: "/banner/plans2.png",
    lines: ["banner.banner2Line1", "banner.banner2Line2"],
    description: "banner.banner2Description",
    price: "€59",
    priceText: "banner.banner2PriceText",
  },
  // {
  //   planSrc: "/banner/plans3.png",
  //   lines: ["banner.banner3Line1", "banner.banner3Line2"],
  //   description: "banner.banner3Description",
  //   price: "€59",
  //   priceText: "banner.banner3PriceText",
  // },
];

export const Banner = () => {
  const t = useTranslations();
  const { isSmall } = useMedia();

  const [sliderIndex, setSliderIndex] = useState(0);

  const incrementIndex = useCallback(() => {
    if (sliderIndex + 1 >= bannersData.length) {
      setSliderIndex(0);
    } else {
      setSliderIndex(sliderIndex + 1);
    }
  }, [sliderIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      incrementIndex();
    }, 5000);
    return () => clearInterval(interval);
  }, [incrementIndex]);

  const onSlideClick = useCallback(() => {
    incrementIndex();
  }, [incrementIndex]);

  const currentSlideData = bannersData[sliderIndex];

  return (
    <Flex
      justify="space-around"
      align="center"
      style={{
        width: "100%",
        height: "250px",
        maxHeight: "250px",
        backgroundImage: "url('/banner/background.jpg')",
        backgroundSize: "cover",
        padding: "20px 0",
        position: "relative",
      }}
      onClick={onSlideClick}
    >
      {!isSmall && (
        <img
          src={currentSlideData.planSrc}
          alt="plans"
          style={{
            maxWidth: "500px",
            maxHeight: "100%",
          }}
        />
      )}
      <Flex vertical style={{ width: isSmall ? "90%" : "40%" }}>
        <Paragraph
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: isSmall ? "1.125rem" : "1.375rem",
            color: "var(--main-biege-color)",
          }}
        >
          {currentSlideData.lines.map((lineKey, lineIndex) => {
            return (
              <Fragment key={lineIndex}>
                {t(lineKey)}
                {lineIndex < currentSlideData.lines.length - 1 && <br />}
              </Fragment>
            );
          })}
        </Paragraph>
        <Paragraph
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "1.125rem",
            color: "var(--main-biege-color)",
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          {t(currentSlideData.description)}
        </Paragraph>
      </Flex>
      {/* <div
        style={{
          position: "absolute",
          width: isSmall ? "100px" : "180px",
          height: isSmall ? "100px" : "180px",
          backgroundColor: "var(--main-white-color)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: isSmall ? "-22px" : "-40px",
          right: isSmall ? "5px" : "30px",
          clipPath: "inset(20% 0 0 0)",
        }}
      >
        <Title
          style={{
            textAlign: "center",
            color: "var(--main-grey-color)",
            fontFamily: "Arial, sans-serif",
            padding: "unset",
            margin: "unset",
          }}
          level={isSmall ? 5 : 2}
        >
          {currentSlideData.price}
          <br />
          <span
            style={{
              fontWeight: "normal",
              fontSize: isSmall ? "0.725rem" : "1.25rem",
            }}
          >
            {t(currentSlideData.priceText)}
          </span>
        </Title>
      </div> */}
    </Flex>
  );
};
