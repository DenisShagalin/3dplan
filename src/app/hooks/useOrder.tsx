import { useCallback } from "react";
import { useRouter } from "@/i18n/navigation";
import { OrderType, getOrderHref } from "../components/order";

// The order form used to open as a modal from here; it is a page now
// ("/order"), so showing it is just a navigation. The old modal version is
// kept below, commented out, for a quick manual revert.
export const useOrder = () => {
  const router = useRouter();

  const showOrder = useCallback(
    (orderValue: OrderType) => {
      router.push(getOrderHref(orderValue));
    },
    [router],
  );

  return {
    showOrder,
  };
};

