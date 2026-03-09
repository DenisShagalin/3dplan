"use client";

import { Flex } from "antd";
import Image from "next/image";
import Text from "antd/lib/typography/Text";
import { useTranslations } from "next-intl";
import { useOrder } from "../hooks/useOrder";
import { OrderType } from "./order";

const plans: Array<{
  src: string;
  alt: string;
  order: OrderType;
  title: string;
}> = [
  {
    src: "/plans/A4_R.jpg",
    alt: "R",
    order: "2D floor plan with dimensions",
    title: "toolbar.servicesItems.2dDim",
  },
  {
    src: "/plans/A4-M.jpg",
    alt: "M",
    order: "2D floor plan with furniture",
    title: "toolbar.servicesItems.2dFur",
  },
  {
    src: "/plans/A4-3D.jpg",
    alt: "3D",
    order: "3D floor plan with furniture",
    title: "toolbar.servicesItems.3dFur",
  },
];

export const MainPlans = () => {
  const t = useTranslations();

  const { orderView, showOrder } = useOrder();

  return (
    <>
      {orderView}
      <Flex className="home_plans" justify="space-around">
        {plans.map((plan) => (
          <Flex key={plan.alt} vertical className="img_wrap" align="center">
            <Image
              src={plan.src}
              alt={plan.alt}
              width={1000}
              height={0}
              priority
              style={{
                width: "100%",
                height: "auto",
              }}
            />
            <Text
              style={{
                color: "var(--main-grey-color)",
                margin: 8,
                fontSize: "1rem",
              }}
            >
              {t(plan.title)}
            </Text>
            <button
              className="order_button"
              onClick={() => showOrder(plan.order)}
            >
              {t("control.order")}
            </button>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
