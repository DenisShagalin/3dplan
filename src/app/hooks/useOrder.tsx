import { useCallback, useMemo, useState } from "react";
import { OrderType, Order } from "../components/order";

export const useOrder = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [orderValue, setOrderValue] = useState<OrderType | null>("2dDimension");

  const showOrder = useCallback((orderValue: OrderType) => {
    setOpen(true);
    setOrderValue(orderValue);
  }, []);

  const hideOrder = useCallback(() => {
    setOpen(false);
    setOrderValue(null);
  }, []);

  const orderView = useMemo(() => {
    if (isOpen && orderValue) {
      return (
        <Order open={isOpen} setOpen={setOpen} defaultValue={orderValue} />
      );
    }
    return null;
  }, [isOpen, orderValue]);

  return {
    orderView,
    showOrder,
    hideOrder,
  };
};
