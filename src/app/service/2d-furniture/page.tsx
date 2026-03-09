"use client";

import { useCallback, useState } from "react";
import { Flex } from "antd";
import { Carousel } from "../../components/common/carousel";
import { Slider } from "../../components/common/slider";
import { Picture } from "../../components/picture";
import { ServicesInfo } from "../../components/common/services-info";
import { useOrder } from "../../hooks/useOrder";

const ImgWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="image_wrap">{children}</div>
);

const images = [
  "/2d-furniture/1.jpg",
  "/2d-furniture/2.jpg",
  "/2d-furniture/3.jpg",
  "/2d-furniture/4.jpg",
  "/2d-furniture/5.jpg",
  "/2d-furniture/6.jpg",
  "/2d-furniture/7.jpg",
  "/2d-furniture/8.jpg",
  "/2d-furniture/9.jpg",
  "/2d-furniture/10.jpg",
];

export default function Page() {
  const { orderView, showOrder } = useOrder();
  const [src, setSrc] = useState("");

  const onClick = useCallback(
    (src: string) => () => {
      setSrc(src);
    },
    [],
  );

  return (
    <>
      <Picture src={src} open={!!src} setOpen={() => setSrc("")} />
      {orderView}
      <Flex vertical align="center">
        <Carousel loading={false}>
          {images.map((src, idx) => (
            <ImgWrap key={idx}>
              <img key={src} src={src} alt={src} onClick={onClick(src)} />
            </ImgWrap>
          ))}
        </Carousel>

        <ServicesInfo
          title="service.2dFurniture.serviceInfo.title"
          description="service.2dFurniture.serviceInfo.description"
          priceText="service.2dFurniture.serviceInfo.priceText"
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
          onOrder={() => {
            showOrder("2D floor plan with furniture");
          }}
        />

        <Slider
          left="/2d-furniture/slider1.jpg"
          right="/2d-furniture/slider2.jpg"
        />
      </Flex>
    </>
  );
}
