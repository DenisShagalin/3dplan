"use client";

import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import Link from "next/link";
import Text from "antd/lib/typography/Text";
import { useTranslations } from "next-intl";
import { Flex } from "antd";
import { PriceMini } from "../components/common/price-mini";
import { useState } from "react";
import { Order } from "@/app/components/order";
import useMedia from "../components/common/media-hook";
import { ServicesInfo } from "../components/common/services-info";

type OrderType =
  | "2dDimension"
  | "2dFurniture"
  | "3dFurniture"
  | "planBasic"
  | "planPlus"
  | "planPro"
  | "";

const ImgWrapper = ({ src }: { src: string }) => (
  <div className="">
    <img key={src} src={src} alt={src} style={{ width: "100%" }} />
  </div>
);

export default function Price() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderType>("");

  const { isSmall } = useMedia();

  const t = useTranslations();
  return (
    <>
      {order && isOpen && (
        <Order open={isOpen} setOpen={setOpen} defaultValue={order} />
      )}
      <Flex vertical>
        <Flex
          vertical={isSmall}
          align={isSmall ? "center" : "flex-start"}
          justify="space-around"
          style={{
            marginBottom: "3rem",
          }}
        >
          {isSmall ? (
            <>
              <Flex
                align="center"
                justify="flex-start"
                vertical
                style={{
                  width: isSmall ? "80%" : "28%",
                }}
              >
                <ImgWrapper src="/2d-dimension/1.jpg" />

                <Title
                  style={{
                    fontFamily: "Arial, sans-serif",
                    textAlign: "center",
                    color: "var(--main-grey-color)",
                    width: "100%",
                    margin: "5px",
                  }}
                  level={4}
                >
                  {t("pricing.dimension.title").toUpperCase()}
                </Title>

                <Paragraph
                  style={{
                    fontFamily: "Calibri, sans-serif",
                    fontSize: "12px",
                    marginTop: "1rem",
                    color: "var(--main-grey-color)",
                    textAlign: "center",
                    margin: "5px",
                  }}
                >
                  {t.rich("pricing.dimension.description")}
                </Paragraph>
                <Flex
                  style={{
                    width: "100%",
                    margin: "5px 0",
                  }}
                  justify="center"
                >
                  <PriceMini price={25} rooms="price.rooms1" />
                  <PriceMini price={50} rooms="price.rooms2" highlight />
                  <PriceMini price={75} rooms="price.rooms3" />
                </Flex>

                <Link
                  href=""
                  style={{ marginTop: "1.5rem" }}
                  onClick={() => {
                    setOpen(true);
                    setOrder("2dDimension");
                  }}
                >
                  <Text className="dark_link">
                    {t("service.2dFurniture.control")}
                  </Text>
                </Link>
              </Flex>

              <Flex
                wrap
                vertical
                align="center"
                justify="flex-start"
                style={{
                  width: isSmall ? "80%" : "28%",
                  marginTop: isSmall ? "2rem" : undefined,
                }}
              >
                <ImgWrapper src="/2d-furniture/1.jpg" />

                <Title
                  style={{
                    fontFamily: "Arial, sans-serif",
                    textAlign: "center",
                    color: "var(--main-grey-color)",
                    width: "100%",
                    margin: "5px",
                  }}
                  level={4}
                >
                  {t("pricing.furniture.title").toUpperCase()}
                </Title>

                <Paragraph
                  style={{
                    fontFamily: "Calibri, sans-serif",
                    fontSize: "12px",
                    marginTop: "1rem",
                    color: "var(--main-grey-color)",
                    textAlign: "center",
                    margin: "5px",
                  }}
                >
                  {t.rich("pricing.furniture.description", {
                    br: () => <br />,
                  })}
                </Paragraph>
                <Flex
                  style={{
                    width: "100%",
                    margin: "5px 0",
                  }}
                  justify="center"
                >
                  <PriceMini price={35} rooms="price.rooms1" />
                  <PriceMini price={70} rooms="price.rooms2" highlight />
                  <PriceMini price={105} rooms="price.rooms3" />
                </Flex>

                <Link
                  href=""
                  style={{ marginTop: "1.5rem" }}
                  onClick={() => {
                    setOrder("2dFurniture");
                    setOpen(true);
                  }}
                >
                  <Text className="dark_link">
                    {t("service.2dFurniture.control")}
                  </Text>
                </Link>
              </Flex>

              <Flex
                wrap
                vertical
                align="center"
                justify="flex-start"
                style={{
                  width: isSmall ? "80%" : "28%",
                  marginTop: isSmall ? "2rem" : undefined,
                }}
              >
                <ImgWrapper src="/3d-furniture/8.jpg" />

                <Title
                  style={{
                    fontFamily: "Arial, sans-serif",
                    textAlign: "center",
                    color: "var(--main-grey-color)",
                    width: "100%",
                    margin: "5px",
                  }}
                  level={4}
                >
                  {t("pricing.3d.title").toUpperCase()}
                </Title>

                <Paragraph
                  style={{
                    fontFamily: "Calibri, sans-serif",
                    fontSize: "12px",
                    marginTop: "1rem",
                    color: "var(--main-grey-color)",
                    textAlign: "center",
                    margin: "5px",
                  }}
                >
                  {t.rich("pricing.3d.description", { br: () => <br /> })}
                </Paragraph>
                <Flex
                  style={{
                    width: "100%",
                    margin: "5px 0",
                  }}
                  justify="center"
                >
                  <PriceMini price={50} rooms="price.rooms1" />
                  <PriceMini price={100} rooms="price.rooms2" highlight />
                  <PriceMini price={150} rooms="price.rooms3" />
                </Flex>

                <Link
                  href=""
                  style={{ marginTop: "1.5rem" }}
                  onClick={() => {
                    setOpen(true);
                    setOrder("3dFurniture");
                  }}
                >
                  <Text className="dark_link">
                    {t("service.2dFurniture.control")}
                  </Text>
                </Link>
              </Flex>
            </>
          ) : (
            <Flex vertical>
              <Flex align="center" justify="space-around">
                <Flex style={{ width: "28%" }}>
                  <ImgWrapper src="/2d-dimension/1.jpg" />
                </Flex>
                <Flex style={{ width: "28%" }}>
                  <ImgWrapper src="/2d-furniture/1.jpg" />
                </Flex>
                <Flex style={{ width: "28%" }}>
                  <ImgWrapper src="/3d-furniture/8.jpg" />
                </Flex>
              </Flex>

              <Flex align="center" justify="space-around">
                <Flex style={{ width: "28%" }}>
                  <Title
                    style={{
                      fontFamily: "Arial, sans-serif",
                      textAlign: "center",
                      color: "var(--main-grey-color)",
                      width: "100%",
                      margin: "5px",
                    }}
                    level={4}
                  >
                    {t("pricing.dimension.title").toUpperCase()}
                  </Title>
                </Flex>
                <Flex style={{ width: "28%" }}>
                  <Title
                    style={{
                      fontFamily: "Arial, sans-serif",
                      textAlign: "center",
                      color: "var(--main-grey-color)",
                      width: "100%",
                      margin: "5px",
                    }}
                    level={4}
                  >
                    {t("pricing.furniture.title").toUpperCase()}
                  </Title>
                </Flex>
                <Flex style={{ width: "28%" }}>
                  <Title
                    style={{
                      fontFamily: "Arial, sans-serif",
                      textAlign: "center",
                      color: "var(--main-grey-color)",
                      width: "100%",
                      margin: "5px",
                    }}
                    level={4}
                  >
                    {t("pricing.3d.title").toUpperCase()}
                  </Title>
                </Flex>
              </Flex>

              <Flex align="center" justify="space-around">
                <Flex style={{ width: "28%" }}>
                  <Paragraph
                    style={{
                      fontFamily: "Calibri, sans-serif",
                      fontSize: "12px",
                      marginTop: "1rem",
                      color: "var(--main-grey-color)",
                      textAlign: "center",
                      margin: "5px",
                    }}
                  >
                    {t.rich("pricing.dimension.description")}
                  </Paragraph>
                </Flex>
                <Flex style={{ width: "28%" }}>
                  <Paragraph
                    style={{
                      fontFamily: "Calibri, sans-serif",
                      fontSize: "12px",
                      marginTop: "1rem",
                      color: "var(--main-grey-color)",
                      textAlign: "center",
                      margin: "5px",
                    }}
                  >
                    {t.rich("pricing.furniture.description", {
                      br: () => <br />,
                    })}
                  </Paragraph>
                </Flex>
                <Flex style={{ width: "28%" }}>
                  <Paragraph
                    style={{
                      fontFamily: "Calibri, sans-serif",
                      fontSize: "12px",
                      marginTop: "1rem",
                      color: "var(--main-grey-color)",
                      textAlign: "center",
                      margin: "5px",
                    }}
                  >
                    {t.rich("pricing.3d.description", { br: () => <br /> })}
                  </Paragraph>
                </Flex>
              </Flex>

              <Flex align="center" justify="space-around">
                <Flex style={{ width: "28%" }}>
                  <Flex
                    style={{
                      width: "100%",
                      margin: "5px 0",
                    }}
                    justify="center"
                  >
                    <PriceMini price={25} rooms="price.rooms1" />
                    <PriceMini price={50} rooms="price.rooms2" highlight />
                    <PriceMini price={75} rooms="price.rooms3" />
                  </Flex>
                </Flex>
                <Flex style={{ width: "28%" }}>
                  <Flex
                    style={{
                      width: "100%",
                      margin: "5px 0",
                    }}
                    justify="center"
                  >
                    <PriceMini price={35} rooms="price.rooms1" />
                    <PriceMini price={70} rooms="price.rooms2" highlight />
                    <PriceMini price={105} rooms="price.rooms3" />
                  </Flex>
                </Flex>
                <Flex style={{ width: "28%" }}>
                  <Flex
                    style={{
                      width: "100%",
                      margin: "5px 0",
                    }}
                    justify="center"
                  >
                    <PriceMini price={50} rooms="price.rooms1" />
                    <PriceMini price={100} rooms="price.rooms2" highlight />
                    <PriceMini price={150} rooms="price.rooms3" />
                  </Flex>
                </Flex>
              </Flex>

              <Flex align="center" justify="space-around">
                <Flex style={{ width: "28%" }} justify="center">
                  <Link
                    href=""
                    style={{ marginTop: "1.5rem" }}
                    onClick={() => {
                      setOpen(true);
                      setOrder("2dDimension");
                    }}
                  >
                    <Text className="dark_link">
                      {t("service.2dFurniture.control")}
                    </Text>
                  </Link>
                </Flex>
                <Flex style={{ width: "28%" }} justify="center">
                  <Link
                    href=""
                    style={{ marginTop: "1.5rem" }}
                    onClick={() => {
                      setOrder("2dFurniture");
                      setOpen(true);
                    }}
                  >
                    <Text className="dark_link">
                      {t("service.2dFurniture.control")}
                    </Text>
                  </Link>
                </Flex>
                <Flex style={{ width: "28%" }} justify="center">
                  <Link
                    href=""
                    style={{ marginTop: "1.5rem" }}
                    onClick={() => {
                      setOpen(true);
                      setOrder("3dFurniture");
                    }}
                  >
                    <Text className="dark_link">
                      {t("service.2dFurniture.control")}
                    </Text>
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>

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
            setOpen(true);
          }}
          skip
        />
      </Flex>
    </>
  );
}
