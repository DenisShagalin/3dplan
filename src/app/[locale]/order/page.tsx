"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { OrderForm, getOrderTypeFromSlug } from "@/app/components/order";

// The preselected service comes from "?type=", see getOrderHref().
const OrderPageContent = () => {
  const searchParams = useSearchParams();
  const defaultValue = getOrderTypeFromSlug(searchParams.get("type"));

  // The key remounts the form when only the query changes, so the new
  // preselection is applied instead of the stale initial state.
  return <OrderForm key={defaultValue} defaultValue={defaultValue} />;
};

export default function OrderPage() {
  // The layout (width, cards, summary) lives in components/order.css now.
  return (
    // useSearchParams() needs a Suspense boundary to prerender the page.
    <Suspense fallback={null}>
      <OrderPageContent />
    </Suspense>
  );
}
