"use client";

import { Flex } from "antd";
import { Carousel } from "../../components/common/carousel";
import { Slider } from "../../components/common/slider";
import { useCallback, useState } from "react";
import { Picture } from "@/app/components/picture";
import { ServicesInfo } from "../../components/common/services-info";
import { useOrder } from "../../hooks/useOrder";

const ImgWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="image_wrap">{children}</div>
);

const images = [
  "/2d-dimension/1.jpg",
  "/2d-dimension/1.jpg",
  "/2d-dimension/2.jpg",
  "/2d-dimension/3.jpg",
  "/2d-dimension/4.jpg",
  "/2d-dimension/5.jpg",
];

export default function Page() {
  const [src, setSrc] = useState("");

  const { orderView, showOrder } = useOrder();

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
          title="service.2dDim.serviceInfo.title"
          description="service.2dDim.serviceInfo.description"
          priceText="service.2dDim.serviceInfo.priceText"
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
            "service.2dDim.serviceInfo.item9",
          ]}
          onOrder={() => {
            showOrder("2D floor plan with dimensions");
          }}
        />

        <Slider
          left="/2d-dimension/slider1.jpg"
          right="/2d-dimension/slider2.jpg"
        />
      </Flex>
    </>
  );
}
