"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { consumeConfirmation } from "@/app/utils/confirmation";
import "./confirmation.css";

export default function Confirmation() {
  const t = useTranslations();
  const router = useRouter();

  // Reachable only right after a contact or order submit.
  const [isAllowed, setAllowed] = useState(false);
  const [submittedKey, setSubmittedKey] = useState<
    "contact" | "order" | null | undefined
  >(null);
  // The flag is one-shot, so it must not be read twice (StrictMode in dev).
  const isChecked = useRef(false);

  useEffect(() => {
    if (isChecked.current) return;
    isChecked.current = true;

    const key = consumeConfirmation();

    if (key === "contact" || key === "order") {
      setAllowed(true);
      setSubmittedKey(key);
    } else {
      router.replace("/");
    }
  }, [router]);

  if (!isAllowed) {
    return null;
  }

  const isOrder = submittedKey === "order";

  return (
    <div className="confirm_page ui_page">
      <div className="confirm_card ui_card">
        <span className="confirm_icon" aria-hidden="true">
          ✓
        </span>

        <h1 className="confirm_h1">
          {t.rich(
            isOrder ? "confirmation.title" : "confirmationContact.title",
            {
              br: () => <br />,
            },
          )}
        </h1>

        <div
          className="confirm_text"
          dangerouslySetInnerHTML={{
            __html: isOrder
              ? t.raw("confirmation.description")
              : t.raw("confirmationContact.description"),
          }}
        />
      </div>
    </div>
  );
}
