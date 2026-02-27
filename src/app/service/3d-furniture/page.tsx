"use client";

import { useCallback, useState } from "react";
import { Flex } from "antd";
import { Carousel } from "../../components/common/carousel";
import { Slider } from "../../components/common/slider";
import { Order } from "../../components/order";
import { Picture } from "../../components/picture";
import { ServicesInfo } from "../../components/common/services-info";

const ImgWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="image_wrap">{children}</div>
);

const images = [
  "/3d-furniture/1.jpg",
  "/3d-furniture/2.jpg",
  "/3d-furniture/3.jpg",
  "/3d-furniture/4.jpg",
  "/3d-furniture/5.jpg",
  "/3d-furniture/6.jpg",
  "/3d-furniture/7.jpg",
  "/3d-furniture/8.jpg",
  "/3d-furniture/9.jpg",
  "/3d-furniture/10.jpg",
  "/3d-furniture/11.jpg",
  "/3d-furniture/12.jpg",
  "/3d-furniture/13.jpg",
  "/3d-furniture/14.jpg",
];

export default function Page() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [src, setSrc] = useState("");

  const onClick = useCallback(
    (src: string) => () => {
      setSrc(src);
    },
    []
  );

  return (
    <>
      <Picture src={src} open={!!src} setOpen={() => setSrc("")} />
      <Order open={isOpen} setOpen={setOpen} defaultValue="3dFurniture" />
      <Flex vertical align="center">
        <Carousel loading={false}>
          {images.map((src, idx) => (
            <ImgWrap key={idx}>
              <img key={src} src={src} alt={src} onClick={onClick(src)} />
            </ImgWrap>
          ))}
        </Carousel>

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
        />
        <Slider
          left="/3d-furniture/slider1.jpg"
          right="/3d-furniture/slider2.jpg"
        />
      </Flex>
    </>
  );
}
