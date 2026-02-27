"use client";

import "./carousel.css";

import { Carousel as AntCarousel } from "antd";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { useRef } from "react";
import Spinner from "./spinner";
import useMedia from "./media-hook";

interface IProps {
  loading: boolean;
  children: any;
  autoplay?: boolean;
}

export const Carousel: React.FC<IProps> = ({ children, loading, autoplay }) => {
  const ref: any = useRef();
  const { isSmall } = useMedia();

  return (
    <Spinner loading={loading}>
      <div className="carousel">
        <div className="carousel_control carousel_control_left">
          <CaretLeftFilled onClick={() => ref.current?.prev()} />
        </div>
        <div className="carousel_images">
          <AntCarousel
            slidesToShow={isSmall ? 1 : 3}
            slidesToScroll={1}
            ref={ref}
            dots={false}
            adaptiveHeight
            autoplay={autoplay}
            infinite
          >
            {children}
          </AntCarousel>
        </div>
        <div className="carousel_control carousel_control_right">
          <CaretRightFilled onClick={() => ref.current?.next()} />
        </div>
      </div>
    </Spinner>
  );
};
