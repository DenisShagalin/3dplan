"use client";

import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import { useTranslations } from "next-intl";
import { Flex } from "antd";
import useMedia from "../components/common/media-hook";
import { ServicesInfo } from "../components/common/services-info";
import { useOrder } from "../hooks/useOrder";

export type OrderType =
  | "2D floor plan with dimensions"
  | "2D floor plan with furniture"
  | "3D floor plan with furniture"
  | "";

const ImgWrapper = ({ src }: { src: string }) => (
  <div className="">
    <img key={src} src={src} alt={src} style={{ width: "100%" }} />
  </div>
);

const TextWrap = ({
  children,
  style = {},
}: {
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => (
  <Text
    style={{
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

const PriceMini = ({
  imageSrc,
  title,
  priceText,
  description,
  descriptionitems,
  items,
  onClick,
}: {
  imageSrc: string;
  title: string;
  priceText: string;
  description: string;
  descriptionitems: string[];
  items: string[];
  onClick: () => void;
}) => {
  const { isSmall } = useMedia();
  const t = useTranslations();
  return (
    <Flex
      vertical
      align="center"
      style={{
        padding: "1rem",
        fontFamily: "Arial, sans-serif",
        width: isSmall ? "90%" : "32%",
      }}
    >
      <ImgWrapper src={imageSrc} />
      <Text style={{ color: "var(--main-grey-color)" }}>{title}</Text>
      <Paragraph
        style={{
          padding: "1rem",
          margin: 0,
          fontSize: "1.325rem",
          textAlign: "center",
        }}
      >
        {priceText}
      </Paragraph>
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
        style={{
          fontSize: "1.125rem",
          marginTop: "1rem",
          color: "var(--main-grey-color)",
        }}
      />

      <Flex
        vertical
        align="flex-start"
        justify="flex-start"
        style={{ paddingTop: isSmall ? "1rem" : "", width: "100%" }}
      >
        {descriptionitems.map((item: string, idx: number) => (
          <TextWrap key={idx} style={{ textAlign: "left" }}>
            {t(item)}
          </TextWrap>
        ))}
      </Flex>

      <Flex
        style={{
          width: "100%",
          margin: "1rem 0",
        }}
        vertical
      >
        <Flex vertical align="flex-start">
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

      {isSmall && (
        <button
          className="order_button"
          onClick={onClick}
          style={{ marginTop: "1rem" }}
        >
          {t("control.order")}
        </button>
      )}
    </Flex>
  );
};

export default function Price() {
  const { orderView, showOrder } = useOrder();
  const { isSmall } = useMedia();

  const t = useTranslations();
  return (
    <>
      {orderView}
      <Flex vertical align="center">
        <Flex
          vertical={isSmall}
          align={isSmall ? "center" : "flex-start"}
          justify="space-around"
          style={{
            marginBottom: "3rem",
            width: "90%",
          }}
        >
          <PriceMini
            imageSrc="/plans/A4_R.jpg"
            title={t("pricing.dimension.title")}
            priceText={t("pricing.dimension.price")}
            description={t.raw("pricing.dimension.description")}
            descriptionitems={[
              "service.2dDim.serviceInfo.item1",
              "service.2dDim.serviceInfo.item2",
              "service.2dDim.serviceInfo.item3",
              "service.2dDim.serviceInfo.item4",
            ]}
            items={[
              "service.2dDim.serviceInfo.item5",
              "service.2dDim.serviceInfo.item6",
              "service.2dDim.serviceInfo.item7",
              "service.2dDim.serviceInfo.item8",
            ]}
            onClick={() => {
              showOrder("2D floor plan with dimensions");
            }}
          />
          <PriceMini
            imageSrc="/plans/A4-M.jpg"
            title={t("pricing.furniture.title")}
            priceText={t("pricing.furniture.price")}
            description={t.raw("pricing.furniture.description")}
            descriptionitems={[
              "service.2dFurniture.serviceInfo.item1",
              "service.2dFurniture.serviceInfo.item2",
              "service.2dFurniture.serviceInfo.item3",
              "service.2dFurniture.serviceInfo.item4",
            ]}
            items={[
              "service.2dFurniture.serviceInfo.item5",
              "service.2dFurniture.serviceInfo.item6",
              "service.2dFurniture.serviceInfo.item7",
              "service.2dFurniture.serviceInfo.item8",
              "service.2dFurniture.serviceInfo.item9",
            ]}
            onClick={() => {
              showOrder("2D floor plan with furniture");
            }}
          />
          <PriceMini
            imageSrc="/plans/A4-3D.jpg"
            title={t("pricing.3d.title")}
            priceText={t("pricing.3d.price")}
            description={t.raw("pricing.3d.description")}
            descriptionitems={[
              "service.3dFurniture.serviceInfo.item1",
              "service.3dFurniture.serviceInfo.item2",
              "service.3dFurniture.serviceInfo.item3",
              "service.3dFurniture.serviceInfo.item4",
            ]}
            items={[
              "service.3dFurniture.serviceInfo.item5",
              "service.3dFurniture.serviceInfo.item6",
              "service.3dFurniture.serviceInfo.item7",
              "service.3dFurniture.serviceInfo.item8",
              "service.3dFurniture.serviceInfo.item9",
            ]}
            onClick={() => {
              showOrder("3D floor plan with furniture");
            }}
          />
        </Flex>

        {!isSmall && (
          <Flex
            align={"flex-start"}
            justify="space-around"
            style={{
              marginBottom: "3rem",
              width: "90%",
            }}
          >
            <button
              className="order_button"
              onClick={() => {
                showOrder("2D floor plan with dimensions");
              }}
              style={{ marginTop: "1rem" }}
            >
              {t("control.order")}{" "}
            </button>

            <button
              className="order_button"
              onClick={() => {
                showOrder("2D floor plan with furniture");
              }}
              style={{ marginTop: "1rem" }}
            >
              {t("control.order")}{" "}
            </button>

            <button
              className="order_button"
              onClick={() => {
                showOrder("3D floor plan with furniture");
              }}
              style={{ marginTop: "1rem" }}
            >
              {t("control.order")}{" "}
            </button>
          </Flex>
        )}

        <ServicesInfo
          title="service.3dFurniture.serviceInfo.title"
          description="service.3dFurniture.serviceInfo.description"
          priceText="service.3dFurniture.serviceInfo.priceText"
          descriptionitems={[
            "service.3dFurniture.serviceInfo.item1",
            "service.3dFurniture.serviceInfo.item2",
            "service.3dFurniture.serviceInfo.item3",
            "service.3dFurniture.serviceInfo.item4",
          ]}
          items={[
            "service.3dFurniture.serviceInfo.item5",
            "service.3dFurniture.serviceInfo.item6",
            "service.3dFurniture.serviceInfo.item7",
            "service.3dFurniture.serviceInfo.item8",
            "service.3dFurniture.serviceInfo.item9",
          ]}
          onOrder={() => {
            showOrder("3D floor plan with furniture");
          }}
          skip
        />
      </Flex>
    </>
  );
}
